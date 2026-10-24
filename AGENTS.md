<!-- BEGIN:nextjs-agent-rules -->

## Next.js version-specific guidance

This project uses Next.js 16.4.3. Before changing Next.js behavior or APIs, read the relevant guide under `node_modules/next/dist/docs/` and follow its current conventions.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project commands and layout

- Use npm (the repository has `package-lock.json`): `npm run dev`, `npm run build`, `npm start`, and `npm run lint`.
- There is no configured test or typecheck script. For focused TypeScript checking, run `npx tsc --noEmit`.
- The App Router application lives in `src/app`; `@/*` aliases to `src/*` (see `tsconfig.json`).
- `next.config.ts` enables Cache Components, partial prefetching, and the React Compiler; CSS is processed through the Tailwind Turbopack loader. Preserve these settings when changing build or styling configuration.
- UI components follow shadcn's `base-nova` style (`components.json`): new primitives in `src/components/ui/` wrap `@base-ui/react` (not Radix), use `class-variance-authority` for variants, and import `cn` from `@/lib/utils` (a re-export of the `cn` package — don't add `clsx`/`tailwind-merge`). Add components with `npx shadcn add <name>`.
