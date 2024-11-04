import random, string
from cryptography.fernet import Fernet
import base64

# Generate a key and keep it secure
key = Fernet.generate_key()
cipher_suite = Fernet(key)

def encrypt_email(email) -> str:
    return cipher_suite.encrypt(email.encode()).decode()

def decrypt_email(encrypted_email):
    return cipher_suite.decrypt(encrypted_email.encode()).decode()

def get_random_string():
  return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(300))

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        # If multiple IPs are present, take the first one
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')
