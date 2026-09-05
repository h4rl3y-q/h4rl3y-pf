# h4rl3y-pf

A comic-book inspired developer portfolio for Priyanka B., focused on backend engineering, security, systems, and full-stack work.

The site presents projects as case files, skills as an engineering arsenal, and live developer activity through an interactive Operator Console.

## Features

- Responsive portfolio layout with a bold comic-book visual system
- Hero profile card with replaceable SVG artwork
- Project case files for PeerDroid, polyllm-gateway, and NetSheild
- Skills grouped by languages, backend and infrastructure, cloud and DevOps, and testing
- Interactive terminal with commands such as `whoami`, `ls projects`, and `help`
- Live public GitHub repository count and recent push status via the GitHub API
- GitHub, LeetCode, and profile summary cards in the Operator Console
- Responsive navigation with desktop and mobile layouts
- Reduced-motion support for users who prefer less animation

## Tech Stack

- Next.js 16.3.3 with the App Router
- React 19
- TypeScript
- SWR for client-side GitHub data fetching
- Lucide React for interface icons
- Tailwind CSS/PostCSS tooling
- pnpm for package management

## Getting Started

### Requirements

- Node.js 20 or newer
- pnpm 10 or newer

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Create a production build

```bash
pnpm build
```

### Run the production server

```bash
pnpm start
```

## Project Structure

```text
app/
  globals.css       Global styles and Tailwind entry point
  layout.tsx        Root document metadata and layout
  page.tsx          Portfolio content, interactive sections, and page styling
components/
  ui/               Shared UI components
lib/
  utils.ts          Shared utility helpers
public/
  profile.svg       Replaceable hero profile artwork
```

## Customization

### Profile image

Replace `public/profile.svg` with your own SVG artwork. The hero card loads it from `/profile.svg`, so no component changes are needed.

### Portfolio content

Most portfolio content is defined near the top of `app/page.tsx` in these data collections:

- `CASES` for project descriptions and technology stacks
- `ARSENAL` for skills
- `TIMELINE` for education and experience
- `POWERS` and `STATS` for the hero card
- `NAV_LINKS` for desktop and mobile navigation

### Account names

The live GitHub data uses `GITHUB_USERNAME` in `app/page.tsx`. The LeetCode cards use `LEETCODE_USERNAME`. Update those constants if the linked profiles change.

The external stat cards are image endpoints. They depend on those third-party services being available and may be rate-limited or unavailable temporarily.

## GitHub API Behavior

The Operator Console requests public data from:

- `https://api.github.com/users/${GITHUB_USERNAME}`
- `https://api.github.com/users/${GITHUB_USERNAME}/events/public`

The requests are made in the browser through SWR and refreshed every five minutes. No GitHub token is required for the current public-data integration.

## Notes

- The project is configured to use unoptimized image handling in `next.config.mjs` because several profile cards are remote image endpoints.
- TypeScript build errors are currently ignored by the Next.js build configuration. Run `pnpm exec tsc --noEmit` separately when checking types.
- Do not commit local environment files, build output, dependencies, or TypeScript build metadata; these are covered by `.gitignore`.

## License

This portfolio is private and intended for personal use. Add a license here if the project is later published for reuse.
