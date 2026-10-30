<!-- BEGIN:nextjs-agent-rules -->

## Next.js version-specific guidance

This project uses Next.js 16.4.3. Before changing Next.js behavior or APIs, read the relevant guide under `node_modules/next/dist/docs/` and follow its current conventions.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project commands and layout

- Use npm (the repository has `package-lock.json`): `npm run dev`, `npm run build`, `npm start`, and `npm run lint` (plain `eslint`, flat config).
- There is no configured test or typecheck script. For focused TypeScript checking, run `npx tsc --noEmit`.
- The App Router application lives in `src/app`; `@/*` aliases to `src/*` (see `tsconfig.json`).
- `next.config.ts` enables Cache Components, partial prefetching, and the React Compiler; CSS is processed through the Tailwind Turbopack loader. Preserve these settings when changing build or styling configuration.
- With Cache Components on, pages that fetch dynamic data wrap the fetching component in `<Suspense>` with a skeleton fallback (see `src/app/destinations/page.tsx`); follow that pattern for new data-driven pages.
- UI components follow shadcn's `base-nova` style (`components.json`): new primitives in `src/components/ui/` wrap `@base-ui/react` (not Radix), use `class-variance-authority` for variants, and import `cn` from `@/lib/utils` (a re-export of the `cn` package — don't add `clsx`/`tailwind-merge`). Add components with `npx shadcn add <name>`.

## Data layer (read this before touching data fetching)

- Destinations and bookings do **not** live in this app's MongoDB. They are fetched from an external REST API (`GET/POST/PUT/DELETE` on `/destination`, `/booking`) configured via env vars; helpers live in `src/lib/destinations.ts` and `src/lib/bookings.ts`. MongoDB is used only by better-auth.
- Env vars (`.env` is gitignored; a fresh clone must create it): `DB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `API_URL`, `NEXT_PUBLIC_API_URL`.
- In client components only `NEXT_PUBLIC_API_URL` is available — bare `process.env.API_URL` is undefined in the browser. Server code may use either.
- Auth is better-auth with the MongoDB adapter (`wanderlyDb`): server instance in `src/lib/auth.ts`, catch-all handler at `src/app/api/auth/[...all]/route.ts`, React client in `src/lib/auth-client.ts` (email/password only). Note `auth-client.ts` exports `signIn`/`useSession` from a second `createAuthClient()` without a `baseURL`.
