# Use the Stripe CLI image as a base
FROM stripe/stripe-cli:latest

# Set the working directory in the container
WORKDIR /app/stripe_listener

RUN echo "Working Directory: $(pwd)" && ls -al

# Copy your entrypoint script into the container
COPY entryPoint.sh /app/stripe_listener/entryPoint.sh

# Debug: Check if the entrypoint script was copied
RUN echo "Contents of /app/stripe_listener after COPY:" && ls -al /app/stripe_listener

# Ensure the entrypoint script is executable
RUN chmod +x /app/stripe_listener/entryPoint.sh

# Debug: Verify permissions of entryPoint.sh
RUN echo "Permissions for entryPoint.sh:" && ls -l /app/stripe_listener/entryPoint.sh

# Set the entrypoint to your script
ENTRYPOINT ["/app/stripe_listener/entryPoint.sh"]
