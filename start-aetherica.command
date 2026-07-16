#!/bin/bash

PROJECT_DIR="/Users/owner/Documents/Codex/2026-06-15/files-mentioned-by-the-user-you-2"
NODE_DIR="/Users/owner/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"

cd "$PROJECT_DIR"
export PATH="$NODE_DIR:$PATH"

echo "Starting Aetherica..."
echo "Open http://localhost:3000/ after the Ready message appears."
echo

"$NODE_DIR/node" ./node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1

status=$?
if [ "$status" -ne 0 ]; then
  echo
  echo "Aetherica did not start. Please send Codex a screenshot of this Terminal window."
  echo "Press Return to close this window."
  read
fi
