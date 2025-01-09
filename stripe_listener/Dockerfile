# Use the Stripe CLI image as a base
FROM stripe/stripe-cli:latest

# Set the working directory in the container
WORKDIR /app/stripe_listener


# Copy your entrypoint script into the container
COPY entryPoint.sh /app/stripe_listener/entryPoint.sh

# Ensure the entrypoint script is executable
RUN chmod +x /app/stripe_listener/entryPoint.sh

# Set the entrypoint to your script
ENTRYPOINT ["/app/stripe_listener/entryPoint.sh"]
