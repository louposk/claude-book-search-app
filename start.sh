#!/usr/bin/env bash
# Start the Angular book-search app on port 4200.
set -euo pipefail
cd "$(dirname "$0")"
echo "Starting claude-book-search-app → http://localhost:4200"
npm start
