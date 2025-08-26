
# Smart Folio Assist

Smart Folio Assist is a modern investment portfolio dashboard and AI assistant. It helps users track, analyze, and optimize their investments with a beautiful UI and interactive features.

## Features

- 📊 Interactive dashboard for investment tracking
- 🤖 AI-powered chat assistant for portfolio insights
- 💡 Visualizations and charts for asset allocation
- ⚡ Fast, responsive, and mobile-friendly UI

## Tech Stack

- [Vite](https://vitejs.dev/) – lightning-fast build tool
- [React](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – type safety
- [Tailwind CSS](https://tailwindcss.com/) – utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) – accessible UI components

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd smart-folio-assist

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Project Structure

```
smart-folio-assist/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and media
│   ├── components/      # React components
│   │   └── ui/          # UI primitives (shadcn/ui)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # App pages (Index, NotFound)
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── tailwind.config.ts   # Tailwind CSS config
├── vite.config.ts       # Vite config
└── ...
```

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

## License

MIT
