# # Use an official Node.js runtime as the base image
# FROM node:16

# # Set the working directory in the container
# WORKDIR /app/Stripe_Listener

# # Download and install the Stripe CLI in the same folder
# RUN apt-get update && apt-get install -y stripe

# # Copy the entrypoint script to the container
# COPY entryPoint.sh /usr/local/bin/ 
# RUN chmod +x /usr/local/bin/entryPoint.sh

# # Set the entrypoint to start the Stripe listener
# ENTRYPOINT ["/usr/local/bin/entryPoint.sh"]

FROM stripe/stripe-cli:latest

# ENV STRIPE_SK=sk_test_4eC39HqLyjWDarjtT1zdp7dc
# ENV BACKEND_DOMAIN=http://your-backend-domain

CMD ["stripe", "listen", "--api-key", "$STRIPE_SK", "--forward-to", "$BACKEND_DOMAIN/api/orders/stripe/payment-handler/"]
