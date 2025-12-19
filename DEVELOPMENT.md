# Development Guide - Holiday Spirit

This guide provides technical information for developers who want to run, modify, or contribute to the Holiday Spirit project.

## 🏗️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS (vanilla, no preprocessor)
- **State Management**: React Hooks (useState)
- **Storage**: Browser localStorage

## 📦 Project Structure

```
holiday-spirit/
├── public/
│   └── holiday-pic.jpg          # Background image for question grid
├── src/
│   ├── components/
│   │   ├── QuestionsInput.tsx   # Question entry form component
│   │   └── QuestionsGrid.tsx    # Main question cards grid component
│   ├── App.tsx                  # Root application component
│   ├── App.css                  # Main application styles
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── eslint.config.js             # ESLint configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
└── package.json                 # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd holiday-spirit
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Preview Production Build

```bash
npm run preview
```

## 🔧 Key Components

### App.tsx

The root component that manages application state and routing between views.

**State Management:**

- `savedQuestions`: Array of question strings loaded from localStorage
- `openedQuestions`: Array of question indices that have been marked as answered

**Key Functions:**

- `handleQuestionsSaved()`: Loads questions from localStorage after initial setup
- `handleReset()`: Clears all data and returns to input screen
- `handleRestart()`: Resets opened questions while keeping the question set
- `handleMarkAsOpened(index)`: Marks a specific question as answered

### QuestionsInput.tsx

Component for entering questions on first use.

**Props:**

- `onSave`: Callback function triggered when questions are saved

**Features:**

- Multi-line textarea for entering questions
- Splits input by newlines to create question array
- Saves to localStorage as JSON

### QuestionsGrid.tsx

Main interactive component displaying the question cards.

**Props:**

- `savedQuestions`: Array of question strings
- `openedQuestions`: Array of answered question indices
- `onReset`: Callback to reset all data
- `onRestart`: Callback to clear answered questions
- `onMarkAsOpened`: Callback to mark a question as answered

**State:**

- `selectedQuestion`: Currently displayed question (null when closed)

**Features:**

- Grid layout with responsive design
- Click-to-reveal popup mechanism
- Background image support
- Disabled state for answered questions

## 💾 Data Storage

The application uses browser localStorage with two keys:

### saved_questions

```json
["Question 1 text", "Question 2 text", "Question 3 text"]
```

Stores the array of question strings.

### opened_questions

```json
[0, 2, 5, 8]
```

Stores an array of indices representing which questions have been answered.

## 🎨 Styling Architecture

### CSS Organization

- **index.css**: Global resets and base styles
- **App.css**: Component-specific styles organized by feature:
  - Input form styles
  - Grid layout and card styles
  - Popup/modal styles
  - Control button styles

### Key Style Classes

- `.app`: Container for input form
- `.questions-grid-container`: Full-screen background container
- `.questions-grid`: CSS Grid layout for cards
- `.question-card`: Individual numbered card
- `.question-card.opened`: Disabled/answered card state
- `.popup-overlay`: Modal backdrop
- `.popup-content`: Question display modal
- `.control-buttons`: Fixed position control panel

### Responsive Design

- Grid uses `auto-fill` with `minmax(120px, 1fr)` for automatic column calculation
- Maximum width constrained to `min(1600px, 80vw)`
- Popup sized at 80vw × 80vh for consistent display across devices

## 🔍 Code Patterns

### State Initialization from localStorage

```typescript
const [savedQuestions, setSavedQuestions] = useState<string[]>(() => {
  const saved = localStorage.getItem("saved_questions");
  return saved ? JSON.parse(saved) : [];
});
```

This pattern prevents unnecessary effects and avoids cascading renders.

### Conditional Rendering

The app uses simple conditional rendering to switch between views:

```typescript
if (savedQuestions.length > 0) {
  return <QuestionsGrid ... />;
}
return <QuestionsInput ... />;
```

## 🧪 Testing Recommendations

When testing or developing:

1. **Clear localStorage**: Use browser DevTools → Application → Local Storage
2. **Test question input**: Try various lengths and special characters
3. **Test grid responsiveness**: Resize browser window to check layout
4. **Test popup interactions**: Click outside, use both buttons
5. **Test state persistence**: Refresh page to verify localStorage works

## 🛠️ Common Development Tasks

### Adding New Features

1. **New question types**: Modify the question display in `QuestionsGrid.tsx`
2. **Additional controls**: Add buttons to `.control-buttons` section
3. **Different layouts**: Modify `.questions-grid` CSS rules
4. **Custom animations**: Add transitions to `.question-card` or `.popup-content`

### Customizing Appearance

1. **Colors**: Update color variables in CSS (currently using `#646cff` as primary)
2. **Background**: Replace `public/holiday-pic.jpg` with your own image
3. **Card sizing**: Adjust `minmax(120px, 1fr)` in grid-template-columns
4. **Popup size**: Modify `80vw` and `80vh` in `.popup-content`

### Adding TypeScript Types

All components use proper TypeScript interfaces. When extending:

```typescript
interface YourComponentProps {
  propertyName: type;
  // Add more props here
}
```

## 📝 Best Practices

- Keep components focused on single responsibilities
- Use TypeScript interfaces for all props
- Maintain localStorage sync with React state
- Follow existing naming conventions (camelCase for functions, PascalCase for components)
- Add comments for complex logic
- Keep CSS organized by feature/component

## 🐛 Debugging Tips

1. Check browser console for errors
2. Inspect localStorage in DevTools
3. Use React DevTools extension to inspect component state
4. Verify localStorage JSON format is valid
5. Check network tab if images don't load

## 🤝 Contributing

When contributing:

1. Follow the existing code style
2. Test thoroughly across different screen sizes
3. Ensure TypeScript compilation succeeds (`npm run build`)
4. Update documentation for new features
5. Consider accessibility (keyboard navigation, screen readers)

## 📄 License

MIT License - Free to use, modify, and distribute.

---

For questions or issues, please open an issue on the project repository.
