FROM node:22-alpine AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN corepack enable && pnpm install --filter @notplace/api... --no-frozen-lockfile
COPY . .
RUN pnpm --filter @notplace/api build
CMD ["pnpm", "--filter", "@notplace/api", "start"]
