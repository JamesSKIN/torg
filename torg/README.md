# Torg - Task Management Application

Torg is a modern, user-friendly task management application built with React, TypeScript, and Vite. It provides an intuitive interface for organizing and tracking tasks with features like categorization, filtering, and detailed task views.

## Features

- **Task Management**
  - Create, edit, and delete tasks
  - Mark tasks as complete/incomplete
  - Add detailed descriptions and due dates
  - Automatic task categorization based on content

- **Smart Categorization**
  - Automatic categorization of tasks into:
    - Work
    - Personal
    - Health
  - Intelligent keyword-based categorization
  - Support for word variations and stems

- **Task Organization**
  - Filter tasks by category and status
  - Sort tasks by due date
  - Expandable task descriptions
  - Detailed task view with all information

- **User Interface**
  - Clean, modern design
  - Responsive layout
  - Intuitive navigation
  - Modal-based task creation and editing
  - Smooth animations and transitions

- **Data Persistence**
  - Local storage support
  - Automatic data saving
  - Persistent task state

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/torg.git
   cd torg
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5175
   ```

## Project Structure

```
torg/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── pages/          # Main application pages
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.css         # Global styles
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Technologies Used

- **Frontend**
  - React
  - TypeScript
  - Vite
  - CSS Modules
  - Local Storage API

- **Development Tools**
  - ESLint
  - Prettier
  - TypeScript
  - npm

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with modern CSS
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
