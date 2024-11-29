
# #!/bin/bash
# stripe listen \
#   --api-key "$STRIPE_SK" \
#   stripe listen --events payment_intent.created,customer.created,payment_intent.succeeded,charge.succeeded,checkout.session.completed,charge.failed  
#   --forward-to "$BACKEND_DOMAIN"/api/orders/stripe/payment-handler/

#!/bin/bash

echo "STRIPE_SK: $STRIPE_SK"
echo "BACKEND_DOMAIN: $BACKEND_DOMAIN"

# Start listening to Stripe events and forward to the backend
stripe listen \
  --api-key "$STRIPE_SK" \
  --forward-to "$BACKEND_DOMAIN/api/orders/stripe/payment-handler/"
