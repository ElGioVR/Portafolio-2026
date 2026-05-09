# codebygio.pro

Professional portfolio for Gio Vazquez, built with Next.js, TypeScript, React, Tailwind CSS and Firebase. The site presents experience, skills, GitHub projects, bilingual content and a contact workflow powered by Resend.

## Live Site

[codebygio.pro](https://codebygio.pro)

## Features

- Bilingual interface with English and Spanish translations.
- Dynamic GitHub project cards loaded from the GitHub API.
- Contact form with visitor and request email notifications.
- Firebase-backed unique visit counter.
- Responsive, polished UI with dark and light modes.
- Generated project preview images for repositories without custom media.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Material UI icons
- Framer Motion
- Firebase Auth and Firestore
- i18next
- Resend

## Project Structure

```text
src/
  app/
    api/
      github-projects/
      project-image/
      send-email/
    components/
      template/
    firebase.ts
    globals.css
    layout.tsx
    page.tsx
  i18n.ts
public/
  avatars/
  cv/
  locales/
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Environment Variables

Create a local `.env.local` file with the values needed for the integrations you want to run:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
GITHUB_USERNAME=
GITHUB_TOKEN=
NEXT_PUBLIC_GITHUB_USERNAME=
```

## Deployment

The project is ready for Vercel deployment. Configure the environment variables in the hosting provider, then deploy from the `main` branch.
