FROM    registry.hub.docker.com/library/node:alpine

# Data
LABEL   MAINTAINER=MOjvar.AmirHossein@GMail.com

# Install required packages
RUN     \
        apk upgrade --update-cache --available && \
        apk add openssl openssh  && \
        rm -rf /var/cache/apk/*

# Change Working directory
WORKDIR /app

# Install npm packages
COPY    package*.json ./ 
RUN     \
        npm i -g npm && \
        npm i

# Copy project files
WORKDIR /app
COPY    . ./

# Generate ssl files
WORKDIR /app/private/ssl
RUN     chmod +x ./gen-cert.sh && \
        ./gen-cert.sh

# Set Environments
ENV     NODE_ENV=production

# Npm install and build files
WORKDIR /app
RUN     \
        npm run build && \
        npm run s-build && \
        cp ./private ./dist -fr

# Set entry point
ENTRYPOINT  ["npm", "run", "d-run"]
