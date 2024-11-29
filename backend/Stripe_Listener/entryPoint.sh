
#!/bin/bash
stripe listen \
  --api-key "$STRIPE_SK" \
  stripe listen --events payment_intent.created,customer.created,payment_intent.succeeded,charge.succeeded,checkout.session.completed,charge.failed  
  --forward-to "$BACKEND_DOMAIN"/api/orders/stripe/payment-handler/

