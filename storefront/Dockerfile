# Runs the storefront on Linux, which sidesteps Windows Application Control
# policies that block Next's and Tailwind's native .node binaries on some hosts.
FROM node:22-alpine

WORKDIR /app

# Install dependencies first so the layer is cached between code changes.
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# -H 0.0.0.0 is required: Next binds to localhost by default, which is not
# reachable from outside the container.
CMD ["npx", "next", "dev", "-H", "0.0.0.0"]
