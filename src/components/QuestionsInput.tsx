import { useState } from "react";

interface QuestionsInputProps {
  onSave: () => void;
}

function QuestionsInput({ onSave }: QuestionsInputProps) {
  const [questions, setQuestions] = useState("");

  const handleProceed = () => {
    if (questions.trim()) {
      // Split by newlines and filter empty lines
      const questionArray = questions
        .split("\n")
        .map((q) => q.trim())
        .filter((q) => q.length > 0);

      localStorage.setItem("saved_questions", JSON.stringify(questionArray));
      localStorage.setItem("opened_questions", JSON.stringify([]));

      console.log("Questions saved:", questionArray);
      onSave();
    }
  };

  return (
    <div className="app">
      <h1>Enter Your Questions</h1>
      <textarea
        value={questions}
        onChange={(e) => setQuestions(e.target.value)}
        placeholder="Enter your questions (one per line)..."
        rows={10}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={handleProceed}
        style={{ marginTop: "20px", padding: "10px 30px", fontSize: "16px" }}
      >
        Proceed
      </button>
    </div>
  );
}

export default QuestionsInput;
