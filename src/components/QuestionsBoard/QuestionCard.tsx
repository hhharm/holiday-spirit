import "./QuestionCard.css";

interface QuestionCardProps {
  index: number;
  isOpened: boolean;
  onClick: (index: number) => void;
}

function QuestionCard({ index, isOpened, onClick }: QuestionCardProps) {
  const handleClick = () => {
    if (!isOpened) {
      onClick(index);
    }
  };

  return (
    <div
      className={`question-card ${isOpened ? "opened" : ""}`}
      onClick={handleClick}
    >
      {index + 1}
    </div>
  );
}

export default QuestionCard;
