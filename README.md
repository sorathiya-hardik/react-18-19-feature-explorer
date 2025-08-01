# React 19 Boilerplate

A modern, production-ready React 19 boilerplate with TypeScript, Tailwind CSS, ESLint, and Prettier.

## 🚀 Features

- ⚛️ **React 19** - Latest React with new features and improvements
- 🏗️ **Vite** - Lightning fast build tool with HMR
- 📝 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔧 **ESLint** - Code linting and quality checks
- 💅 **Prettier** - Code formatting automation
- 📁 **Well-organized** - Clean folder structure with path aliases
- 🎯 **Production Ready** - Optimized build configuration

## 📦 What's Included

### Core Dependencies

- React 19 with React DOM
- TypeScript for type safety
- Vite for fast development and building

### Development Tools

- ESLint with React and TypeScript rules
- Prettier for code formatting
- Tailwind CSS for styling
- PostCSS with Autoprefixer

### Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── assets/        # Static assets
├── App.tsx        # Main App component
├── main.tsx       # Application entry point
└── index.css      # Global styles with Tailwind
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript compiler check

## 🎨 Styling

This boilerplate uses Tailwind CSS for styling. The configuration includes:

- Custom color palette
- Inter font family
- Responsive design utilities
- Custom component classes in `src/index.css`

### Custom Classes

- `.btn` - Base button styles
- `.btn-primary` - Primary button variant
- `.btn-secondary` - Secondary button variant
- `.card` - Card component styles

## 🔧 Configuration

### Path Aliases

The following path aliases are configured:

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/hooks/*` → `src/hooks/*`
- `@/utils/*` → `src/utils/*`
- `@/types/*` → `src/types/*`

### ESLint Rules

- React 19 compatible rules
- TypeScript strict mode
- Prettier integration
- Unused variable warnings
- Import/export best practices

### TypeScript Configuration

- Strict mode enabled
- Modern ES2020 target
- Path mapping for clean imports
- Optimized for Vite bundler

## 🏗️ Building for Production

```bash
npm run build
```

This will:

1. Run TypeScript compiler
2. Build optimized bundle with Vite
3. Generate source maps
4. Output to `dist/` directory

## 🧪 Code Quality

The project includes comprehensive linting and formatting:

- **ESLint** - Catches potential issues and enforces coding standards
- **Prettier** - Ensures consistent code formatting
- **TypeScript** - Provides type safety and better IntelliSense

Run all checks:

```bash
npm run lint && npm run format:check && npm run type-check
```

## 📁 Folder Structure Best Practices

- **`components/`** - Reusable UI components
- **`hooks/`** - Custom React hooks
- **`utils/`** - Pure utility functions
- **`types/`** - TypeScript interfaces and types
- **`assets/`** - Images, icons, and other static files

## 🤝 Contributing

1. Follow the existing code style
2. Run linting and formatting before committing
3. Write meaningful commit messages
4. Add TypeScript types for new code

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Next Steps

- Add routing with React Router
- Implement state management (Zustand, Redux Toolkit)
- Add testing setup (Vitest, React Testing Library)
- Configure Storybook for component documentation
- Set up CI/CD pipeline
- Add PWA capabilities

---

Happy coding! 🎉
