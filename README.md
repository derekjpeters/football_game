# Football Game

A simple football scoreboard application built with React, TypeScript, and Tailwind CSS.

## Feature

- Live score tracking for home and away teams
- Possession indicator
- Interactive controls for scoring (touchdown, field goal, safety)
- Modern, responsive UI with Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js) or **yarn** as an alternative package manager

You can verify your installations by running:

```bash
node --version
npm --version
```

## Dependencies

### Runtime Dependencies

- **react** (^19.1.1) - JavaScript library for building user interfaces
- **react-dom** (^19.1.1) - React package for working with the DOM

### Development Dependencies

- **vite** (^7.1.7) - Fast build tool and development server
- **typescript** (~5.9.3) - TypeScript language support
- **@vitejs/plugin-react** (^5.0.4) - Official Vite plugin for React with Fast Refresh
- **tailwindcss** (^3.4.18) - Utility-first CSS framework
- **postcss** (^8.5.6) - Tool for transforming CSS with JavaScript
- **autoprefixer** (^10.4.21) - PostCSS plugin to parse CSS and add vendor prefixes
- **eslint** (^9.36.0) - Linting tool for JavaScript/TypeScript
- **@eslint/js** (^9.36.0) - ESLint JavaScript configuration
- **eslint-plugin-react-hooks** (^5.2.0) - ESLint rules for React Hooks
- **eslint-plugin-react-refresh** (^0.4.22) - ESLint rules for React Fast Refresh
- **typescript-eslint** (^8.45.0) - TypeScript support for ESLint
- **globals** (^16.4.0) - Global identifiers from different JavaScript environments
- **@types/react** (^19.1.16) - TypeScript definitions for React
- **@types/react-dom** (^19.1.9) - TypeScript definitions for React DOM
- **@types/node** (^24.6.0) - TypeScript definitions for Node.js

## Installation

1. Clone the repository (if you haven't already):

```bash
git clone <repository-url>
cd football_game
```

2. Install all dependencies:

```bash
npm install
```

This command will install all the dependencies listed in [package.json](package.json), including React, TypeScript, Vite, Tailwind CSS, and all development tools.

## Running the Application

### Development Mode

To start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use). The page will automatically reload when you make changes to the code.

### Production Build

To create an optimized production build:

```bash
npm run build
```

This will:
1. Run TypeScript compiler to check for type errors
2. Build the application using Vite
3. Output the production-ready files to the `dist` directory

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To check your code for linting errors:

```bash
npm run lint
```

## Project Structure

```
football_game/
├── src/
│   ├── components/
│   │   ├── Controls.tsx      # Score control buttons
│   │   └── Scoreboard.tsx    # Score display component
│   ├── App.tsx               # Main application component
│   ├── types.ts              # TypeScript type definitions
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles (Tailwind imports)
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.cjs       # Tailwind CSS configuration
├── postcss.config.cjs        # PostCSS configuration
└── vite.config.ts            # Vite configuration
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and quality

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Module Not Found Errors

If you encounter module not found errors, try:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Run the TypeScript compiler to see detailed type errors:

```bash
npx tsc --noEmit
```

## Contributing

1. Make your changes
2. Run linting: `npm run lint`
3. Build the project: `npm run build`
4. Test the production build: `npm run preview`

## License

This project is private and not licensed for public use.
