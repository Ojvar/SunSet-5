FROM    docker.io/library/node:alpine

# Data
LABEL   MAINTAINER=MOjvar.AmirHossein@GMail.com

# Args
ARG HTTPS

# Install required packages
RUN     \
        apk upgrade --update-cache --available && \
        apk add openssl openssh  && \
        rm -rf /var/cache/apk/*

# Change Working directory
WORKDIR /app

# Install npm packages
COPY    ./package.json ./
RUN     \
        npm i -g npm && \
        npm i

# Copy project files
WORKDIR /app
COPY    ./ ./
COPY    ./docker/frontend-server-config.ts /app/configs/frontend/server.ts

# Generate ssl files
WORKDIR /app/private/ssl
RUN     if [[ -n "$HTTPS" ]]; then \
                chmod +x ./gen-cert.sh && \
                ./gen-cert.sh; \
        fi

# Set Environments
ENV     NODE_ENV=production

# Npm install and build files
WORKDIR /app

# Build files
RUN     \
        npm run build && \
        npm run s-build && \
        cp ./private ./dist -fr

# Set entry point
ENTRYPOINT  ["npm", "run", "d-run"]
