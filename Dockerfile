# based on https://github.com/vercel/next.js/tree/canary/examples/with-docker

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS others
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
RUN apk add --no-cache git git-lfs
RUN git lfs install
RUN git clone --depth 1 https://github.com/JohanLi/uncharted-waters-2
RUN cd uncharted-waters-2 && npm install && PUBLIC_PATH=/uncharted-waters-2/ npm run build
RUN git clone --depth 1 https://github.com/JohanLi/fingerprint-scanner-simulator
RUN cd fingerprint-scanner-simulator && npm install -g pnpm && pnpm install --frozen-lockfile && BASE_PATH=/gta-online/fingerprint-scanner-simulator pnpm run build

FROM node:20-alpine AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=others /app/uncharted-waters-2/build ./public/uncharted-waters-2
COPY --from=others /app/fingerprint-scanner-simulator/dist ./public/gta-online/fingerprint-scanner-simulator

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV HOSTNAME "0.0.0.0"
ENV PORT 3000

CMD ["node", "server.js"]
