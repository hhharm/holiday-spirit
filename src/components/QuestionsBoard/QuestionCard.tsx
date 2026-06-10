import "./QuestionCard.css";

interface QuestionCardProps {
  index: number;
  isOpened: boolean;
  isHighlighted?: boolean;
  onClick: (index: number) => void;
}

function QuestionCard({
  index,
  isOpened,
  isHighlighted = false,
  onClick,
}: QuestionCardProps) {
  const classes = [
    "question-card",
    isOpened ? "opened" : "",
    isHighlighted ? "highlighted" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      disabled={isOpened}
      onClick={() => onClick(index)}
    >
      {index + 1}
    </button>
  );
}

export default QuestionCard;
