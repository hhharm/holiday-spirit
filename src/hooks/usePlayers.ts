import { useState } from "react";

export interface Player {
  name: string;
  answers: number;
}

const STORAGE_KEY = "players";

function loadPlayers(): Player[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>(loadPlayers);

  const persist = (next: Player[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPlayers(next);
  };

  const addPlayer = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || players.some((p) => p.name === trimmed)) return;
    persist([...players, { name: trimmed, answers: 0 }]);
  };

  const removePlayer = (name: string) => {
    persist(players.filter((p) => p.name !== name));
  };

  const recordAnswer = (name: string) => {
    persist(
      players.map((p) =>
        p.name === name ? { ...p, answers: p.answers + 1 } : p
      )
    );
  };

  const resetCounts = () => {
    persist(players.map((p) => ({ ...p, answers: 0 })));
  };

  // Picks among players with the fewest answers so turns stay balanced.
  const pickNext = (exclude?: string | null): string | null => {
    const pool =
      exclude && players.length > 1
        ? players.filter((p) => p.name !== exclude)
        : players;
    if (pool.length === 0) return null;
    const min = Math.min(...pool.map((p) => p.answers));
    const candidates = pool.filter((p) => p.answers === min);
    return candidates[Math.floor(Math.random() * candidates.length)].name;
  };

  return {
    players,
    addPlayer,
    removePlayer,
    recordAnswer,
    resetCounts,
    pickNext,
  };
}
