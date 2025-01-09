#!/bin/bash

echo "BACKEND_DOMAIN hidebug: $BACKEND_DOMAIN"

# Start listening to Stripe events and forward to the backend
stripe listen --events payment_intent.created,customer.created,payment_intent.succeeded,charge.succeeded,checkout.session.completed,charge.failed \
  --api-key "$STRIPE_SK" \
  --forward-to "$BACKEND_DOMAIN/api/orders/stripe/payment-handler/"
