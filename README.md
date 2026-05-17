# Retro OS Portfolio

A personal portfolio site styled like **Windows 2000**. Double-click desktop icons to open draggable windows for experience, projects, skills, and more.

## Features

- Boot screen and classic desktop with taskbar
- **My Computer** — profile and contact details
- **Experience.doc** — work history
- **Projects** — featured projects
- **Skills.exe** — technical skills
- **Command Prompt** — interactive terminal (`help`, `whoami`, `skills`, etc.)
- **Internet Explorer**, **Paint**, **Media Player**, and **Recycle Bin**

Portfolio content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).

## Tech stack

React · TypeScript · Vite · Tailwind CSS · Zustand · Motion

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Type-check |

## Customize

Edit [`src/data/portfolio.ts`](src/data/portfolio.ts) with your name, experience, projects, and skills. Update terminal commands in [`src/components/apps/Terminal.tsx`](src/components/apps/Terminal.tsx) if needed.

## License

Personal portfolio — use as inspiration; update content for your own site.
