#!/bin/bash

cd "$(dirname "$0")" || exit 1
export PATH="/Users/owner/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"

echo "Starting the Aetherica preview at http://127.0.0.1:3012"
echo "Keep this window open while viewing the site."
echo

exec ./node_modules/.bin/next start -H 127.0.0.1 -p 3012
