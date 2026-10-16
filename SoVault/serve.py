import http.server
import socketserver
import os

PORT = 5500
DIRECTORY = r"c:\Users\Owner\OneDrive\Desktop\New folder (2)"

class DualStackServer(http.server.ThreadingHTTPServer):
    def server_bind(self):
        self.socket.setsockopt(http.server.socket.SOL_SOCKET, http.server.socket.SO_REUSEADDR, 1)
        super().server_bind()

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Prevent aggressive browser caching during dev
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    with DualStackServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://localhost:{PORT} and http://127.0.0.1:{PORT}")
        httpd.serve_forever()
