#!/bin/bash
set -e

cd "$(dirname "$0")"

REMOTE_URL="https://github.com/vitaldesignsource/AETHERICA.git"

if [ ! -d ".git" ]; then
  git init
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

git branch -M main

echo
echo "Aetherica repository connected:"
git remote -v
echo
echo "Next optional step:"
echo "  git add ."
echo "  git commit -m \"Initial Aetherica site\""
echo "  git push -u origin main"
