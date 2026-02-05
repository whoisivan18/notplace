FROM node:22-alpine AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
RUN corepack enable && pnpm install --filter @notplace/web... --no-frozen-lockfile
COPY . .
RUN pnpm --filter @notplace/web build
CMD ["pnpm", "--filter", "@notplace/web", "start"]
