import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IconDownload,
  IconEyeCheck,
  IconEyeX,
  IconRefreshAlert,
  IconRotateClockwise,
} from "@tabler/icons-react";
import Button from "../shared/Button";
import QuestionCard from "./QuestionCard";
import PlayersPopup from "../Players/PlayersPopup";
import Celebration from "../Celebration/Celebration";
import { usePlayers } from "../../hooks/usePlayers";
import { ICON_PROPS } from "../../constants/icons";
import "./QuestionsGrid.css";

interface QuestionsGridProps {
  savedQuestions: string[];
  openedQuestions: number[];
  onReset: () => void;
  onRestart: () => void;
  onMarkAsOpened: (index: number) => void;
}

function QuestionsGrid({
  savedQuestions,
  openedQuestions,
  onReset,
  onRestart,
  onMarkAsOpened,
}: QuestionsGridProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [answerer, setAnswerer] = useState<string | null>(null);
  const [showPlayers, setShowPlayers] = useState(false);
  const spinTimer = useRef<number | null>(null);
  const { t } = useTranslation();
  const { players, addPlayer, removePlayer, recordAnswer, resetCounts, pickNext } =
    usePlayers();

  useEffect(() => {
    return () => {
      if (spinTimer.current !== null) window.clearTimeout(spinTimer.current);
    };
  }, []);

  const unopened = savedQuestions
    .map((_, index) => index)
    .filter((index) => !openedQuestions.includes(index));
  const allDone = savedQuestions.length > 0 && unopened.length === 0;

  const openQuestion = (index: number) => {
    setSelectedQuestion(index);
    setAnswerer(pickNext());
  };

  const handleCardClick = (index: number) => {
    if (!openedQuestions.includes(index) && !isSpinning) {
      openQuestion(index);
    }
  };

  const handleRandomPick = () => {
    if (unopened.length === 0 || isSpinning) return;
    const target = unopened[Math.floor(Math.random() * unopened.length)];
    if (unopened.length === 1) {
      openQuestion(target);
      return;
    }

    setIsSpinning(true);
    const totalSteps = Math.min(14, 6 + unopened.length);
    let step = 0;

    const tick = () => {
      step += 1;
      if (step >= totalSteps) {
        setHighlighted(target);
        spinTimer.current = window.setTimeout(() => {
          setHighlighted(null);
          setIsSpinning(false);
          openQuestion(target);
        }, 500);
        return;
      }
      const candidates = unopened.filter((i) => i !== highlighted);
      setHighlighted(candidates[Math.floor(Math.random() * candidates.length)]);
      // Slow down as we approach the final card, like a roulette wheel
      spinTimer.current = window.setTimeout(tick, 60 + step * 20);
    };
    tick();
  };

  const handleClose = () => {
    setSelectedQuestion(null);
    setAnswerer(null);
  };

  const handleDone = () => {
    if (selectedQuestion !== null) {
      if (answerer) recordAnswer(answerer);
      onMarkAsOpened(selectedQuestion);
      setSelectedQuestion(null);
      setAnswerer(null);
    }
  };

  const handleRestart = () => {
    resetCounts();
    onRestart();
  };

  const handleExport = () => {
    const text = savedQuestions.join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "questions.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const done = openedQuestions.length;
  const total = savedQuestions.length;

  return (
    <div className="questions-grid-container">
      <header className="board-header">
        <h1 className="board-title">🎄 {t("appTitle")}</h1>
        <div className="board-progress">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: total ? `${(done / total) * 100}%` : "0%" }}
            />
          </div>
          <span className="progress-label">
            {t("progressAnswered", { done, total })}
          </span>
        </div>
      </header>

      <div className="questions-grid">
        {savedQuestions.map((_, index) => (
          <QuestionCard
            key={index}
            index={index}
            isOpened={openedQuestions.includes(index)}
            isHighlighted={highlighted === index}
            onClick={handleCardClick}
          />
        ))}
      </div>

      <div className="control-buttons">
        <Button
          color="primary"
          size="small"
          onClick={handleRandomPick}
          disabled={unopened.length === 0 || isSpinning}
        >
          🎲 {t("randomCard")}
        </Button>
        <Button
          color="secondary"
          size="small"
          onClick={() => setShowPlayers(true)}
        >
          👥 {t("players")}
        </Button>
        <Button
          color="secondary"
          size="small"
          onClick={handleRestart}
          title={t("restartCards")}
          startIcon={<IconRotateClockwise {...ICON_PROPS} />}
        >
          {t("restartCards")}
        </Button>
        <Button
          color="secondary"
          size="small"
          onClick={onReset}
          title={t("resetQuestions")}
          startIcon={<IconRefreshAlert {...ICON_PROPS} />}
        >
          {t("resetQuestions")}
        </Button>
        <Button
          color="secondary"
          size="small"
          onClick={handleExport}
          title={t("exportQuestions")}
          startIcon={<IconDownload {...ICON_PROPS} />}
        >
          {t("exportQuestions")}
        </Button>
      </div>

      {selectedQuestion !== null && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-ornament">❄ ✦ ❄</div>
            <h2>
              {t("question")} {selectedQuestion + 1}
            </h2>
            {answerer && (
              <div className="answerer-badge">
                <span>
                  🎤 {t("answering")}: <strong>{answerer}</strong>
                </span>
                {players.length > 1 && (
                  <button
                    className="answerer-reroll"
                    onClick={() => setAnswerer(pickNext(answerer))}
                    title={t("pickSomeoneElse")}
                  >
                    🎲
                  </button>
                )}
              </div>
            )}
            <p className="question-text">{savedQuestions[selectedQuestion]}</p>
            <div className="popup-buttons">
              <Button
                color="secondary"
                onClick={handleClose}
                startIcon={<IconEyeX {...ICON_PROPS} />}
              >
                {t("close")}
              </Button>
              <Button
                color="primary"
                onClick={handleDone}
                startIcon={<IconEyeCheck {...ICON_PROPS} />}
              >
                {t("done")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showPlayers && (
        <PlayersPopup
          players={players}
          onAdd={addPlayer}
          onRemove={removePlayer}
          onClose={() => setShowPlayers(false)}
        />
      )}

      {allDone && selectedQuestion === null && (
        <Celebration onPlayAgain={handleRestart} onNewQuestions={onReset} />
      )}
    </div>
  );
}

export default QuestionsGrid;
