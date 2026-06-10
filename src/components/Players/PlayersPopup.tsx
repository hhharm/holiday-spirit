import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../shared/Button";
import type { Player } from "../../hooks/usePlayers";
import "./PlayersPopup.css";

interface PlayersPopupProps {
  players: Player[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
  onClose: () => void;
}

function PlayersPopup({ players, onAdd, onRemove, onClose }: PlayersPopupProps) {
  const [name, setName] = useState("");
  const { t } = useTranslation();

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name);
      setName("");
    }
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="players-popup" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h3>👥 {t("players")}</h3>
          <button className="settings-close" onClick={onClose}>
            ×
          </button>
        </div>

        <p className="players-hint">{t("playersHint")}</p>

        <div className="players-add-row">
          <input
            className="players-input"
            type="text"
            value={name}
            maxLength={40}
            placeholder={t("playerNamePlaceholder")}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
          />
          <Button color="primary" size="small" onClick={handleAdd}>
            {t("addPlayer")}
          </Button>
        </div>

        {players.length === 0 ? (
          <p className="players-empty">{t("noPlayersYet")}</p>
        ) : (
          <ul className="players-list">
            {players.map((player) => (
              <li key={player.name} className="player-chip">
                <span className="player-name">{player.name}</span>
                <span className="player-count">{player.answers}</span>
                <button
                  className="player-remove"
                  onClick={() => onRemove(player.name)}
                  aria-label={`${t("close")} ${player.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PlayersPopup;
