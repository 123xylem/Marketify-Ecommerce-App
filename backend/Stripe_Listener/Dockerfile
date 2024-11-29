# Use the Stripe CLI image as a base
FROM stripe/stripe-cli:latest

# Set the working directory in the container
WORKDIR /app/Stripe_Listener

# Copy the entryPoint.sh script to the container
# COPY entryPoint.sh /usr/local/bin/entryPoint.sh

# # Make the script executable
# RUN chmod +x /usr/local/bin/entryPoint.sh

# # Set the entrypoint to the script that starts the Stripe listener
# ENTRYPOINT ["/usr/local/bin/entryPoint.sh"]

# FROM stripe/stripe-cli:latest

# # ENV STRIPE_SK=sk_test_4eC39HqLyjWDarjtT1zdp7dc
# # ENV BACKEND_DOMAIN=http://your-backend-domain
# RUN env
# CMD ["listen", "--api-key", "$STRIPE_SK", "--forward-to", "$BACKEND_DOMAIN/api/orders/stripe/payment-handler/"]
