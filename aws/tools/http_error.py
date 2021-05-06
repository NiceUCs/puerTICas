class HTTPError(Exception):
    def __init__(self, statusCode, msg):
        self.statusCode = statusCode
        self.msg = msg