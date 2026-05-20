#!/usr/bin/env python3
"""
Production-grade static server for OpenReel Video.

Handles:
  - COOP/COEP headers required by SharedArrayBuffer (FFmpeg.wasm)
  - SPA routing (non-file URLs fall back to index.html)
  - Correct MIME types for WASM and JavaScript modules

Usage:
  python3 apps/web/serve-dist.py
  python3 apps/web/serve-dist.py --port 8080
"""

import http.server
import argparse
import os
import mimetypes
from pathlib import Path

ROOT = Path(__file__).resolve().parent / "dist"


class OpenReelHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        # Required for SharedArrayBuffer (FFmpeg.wasm)
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cross-Origin-Resource-Policy", "cross-origin")
        super().end_headers()

    def do_GET(self):
        path = self.path.split("?")[0].split("#")[0]

        # Serve index.html for SPA routes without a file extension
        if not os.path.splitext(path)[1]:
            file_path = ROOT / path.lstrip("/")
            if not file_path.exists() or not file_path.is_file():
                self.path = "/index.html"

        super().do_GET()

    def log_message(self, format, *args):
        # Add emoji indicators for common status codes
        emoji = {200: "✓", 304: "↻", 404: "✗"}.get(args[0], " ")
        print(f"  {emoji} {args[0]} - {args[1]}")


def main():
    parser = argparse.ArgumentParser(description="Serve OpenReel Video production build")
    parser.add_argument("--port", "-p", type=int, default=8000, help="Port (default: 8000)")
    parser.add_argument("--bind", "-b", default="0.0.0.0", help="Address (default: 0.0.0.0)")
    args = parser.parse_args()

    if not ROOT.exists():
        print(f"Error: dist directory not found at {ROOT}")
        print("Run 'pnpm build' first.")
        return 1

    mimetypes.add_type("application/wasm", ".wasm")
    mimetypes.add_type("application/javascript", ".mjs")

    server = http.server.ThreadingHTTPServer((args.bind, args.port), OpenReelHandler)

    print(f"\n  OpenReel Video — Production Server")
    print(f"  → http://localhost:{args.port}")
    print(f"  → COOP/COEP headers enabled for SharedArrayBuffer\n")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
        server.shutdown()


if __name__ == "__main__":
    main()
