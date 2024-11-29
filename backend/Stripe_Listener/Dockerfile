# Use an official Node.js runtime as a parent image (if your backend is Node.js-based)
FROM node:16

# Set the working directory in the container
WORKDIR /app/backend/Stripe_Listener

# Install curl (required for Stripe CLI installation)
RUN apt-get update && apt-get install -y curl

# Install Stripe CLI
RUN curl -sSL https://github.com/stripe/stripe-cli/releases/download/v1.10.0/stripe-cli_1.10.0_linux_x86_64.tar.gz | tar -xz
RUN mv stripe /usr/local/bin/

# Continue with your other installation steps
# COPY your application code and install dependencies
COPY . .
