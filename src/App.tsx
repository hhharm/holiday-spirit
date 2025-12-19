import { useState } from "react";
import "./App.css";
import QuestionsInput from "./components/QuestionsInput";
import QuestionsGrid from "./components/QuestionsGrid";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  const [savedQuestions, setSavedQuestions] = useState<string[]>(() => {
    const saved = localStorage.getItem("saved_questions");
    console.log("saved_questions:", saved);
    return saved ? JSON.parse(saved) : [];
  });

  const [openedQuestions, setOpenedQuestions] = useState<number[]>(() => {
    const opened = localStorage.getItem("opened_questions");
    console.log("opened_questions:", opened);
    return opened ? JSON.parse(opened) : [];
  });

  const handleQuestionsSaved = () => {
    const saved = localStorage.getItem("saved_questions");
    const opened = localStorage.getItem("opened_questions");
    if (saved) setSavedQuestions(JSON.parse(saved));
    if (opened) setOpenedQuestions(JSON.parse(opened));
  };

  const handleReset = () => {
    localStorage.removeItem("saved_questions");
    localStorage.removeItem("opened_questions");
    setSavedQuestions([]);
    setOpenedQuestions([]);
  };

  const handleRestart = () => {
    localStorage.setItem("opened_questions", JSON.stringify([]));
    setOpenedQuestions([]);
  };

  const handleMarkAsOpened = (index: number) => {
    const newOpenedQuestions = [...openedQuestions, index];
    localStorage.setItem(
      "opened_questions",
      JSON.stringify(newOpenedQuestions)
    );
    setOpenedQuestions(newOpenedQuestions);
  };

  if (savedQuestions.length > 0) {
    return (
      <>
        <LanguageSwitcher />
        <QuestionsGrid
          savedQuestions={savedQuestions}
          openedQuestions={openedQuestions}
          onReset={handleReset}
          onRestart={handleRestart}
          onMarkAsOpened={handleMarkAsOpened}
        />
      </>
    );
  }

  return (
    <>
      <LanguageSwitcher />
      <QuestionsInput onSave={handleQuestionsSaved} />
    </>
  );
}

export default App;
