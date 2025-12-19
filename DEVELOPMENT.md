# Development Guide - Holiday Spirit

This guide provides technical information for developers who want to run, modify, or contribute to the Holiday Spirit project.

## 🏗️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS (vanilla, no preprocessor)
- **State Management**: React Hooks
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

### Deploying to GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. **Automatic Deployment**: Every push to the `master` branch triggers a GitHub Actions workflow that builds and deploys the app
2. **Manual Deployment**: You can also trigger deployment manually from the Actions tab in your GitHub repository
3. **Live URL**: Once deployed, the app will be available at `https://hhharm.github.io/holiday-spirit/`

### Preview Production Build

```bash
npm run preview
```

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

## 🧪 Testing Recommendations

When testing or developing:

1. **Clear localStorage**: Use browser DevTools → Application → Local Storage
2. **Test question input**: Try various lengths and special characters
3. **Test grid responsiveness**: Resize browser window to check layout
4. **Test popup interactions**: Click outside, use both buttons
5. **Test state persistence**: Refresh page to verify localStorage works

## 📝 Best Practices

- Keep components focused on single responsibilities
- Use TypeScript interfaces for all props
- Maintain localStorage sync with React state
- Follow existing naming conventions (camelCase for functions, PascalCase for components)
- Add comments for complex logic
- Keep CSS organized by feature/component

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
