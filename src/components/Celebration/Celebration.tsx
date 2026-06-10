import { useTranslation } from "react-i18next";
import Button from "../shared/Button";
import "./Celebration.css";

interface CelebrationProps {
  onPlayAgain: () => void;
  onNewQuestions: () => void;
}

const COLORS = ["#e9b949", "#cf4036", "#2e7d4f", "#5b8def", "#fffaf0"];

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  round: boolean;
}

// Generated once per page load; components must stay pure during render
const CONFETTI: ConfettiPiece[] = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 4,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  size: 6 + Math.random() * 7,
  round: Math.random() > 0.5,
}));

function Celebration({ onPlayAgain, onNewQuestions }: CelebrationProps) {
  const { t } = useTranslation();
  const pieces = CONFETTI;

  return (
    <div className="celebration-overlay">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * (piece.round ? 1 : 0.45),
            background: piece.color,
            borderRadius: piece.round ? "50%" : "2px",
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
      <div className="celebration-card">
        <div className="celebration-emoji">🎉</div>
        <h2>{t("allDoneTitle")}</h2>
        <p>{t("allDoneMessage")}</p>
        <div className="celebration-buttons">
          <Button color="secondary" onClick={onNewQuestions}>
            {t("newQuestions")}
          </Button>
          <Button color="primary" onClick={onPlayAgain}>
            {t("playAgain")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Celebration;
