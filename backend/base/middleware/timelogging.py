import time
import logging

logger = logging.getLogger(__name__)

class LogRequestTimingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        end_time = time.time()
        elapsed_time = (end_time - start_time) * 1000  # in milliseconds
        logger.warning(f"Method: {request.method}, Path: {request.META['RAW_URI']},  Time: {elapsed_time:.2f}ms")
        return response
