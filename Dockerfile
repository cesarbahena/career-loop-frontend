# Stage 1: Install dependencies
FROM node:20-slim as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Build the application
FROM base as build
WORKDIR /app
COPY . .
RUN npm run build

# Stage 3: Production server
FROM node:20-slim as production
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
