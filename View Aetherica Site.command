#!/bin/bash
#
# Double-click this file to view the Aetherica site in your browser.
# It finds Node, installs anything missing, starts the site, and opens it.

cd "$(dirname "$0")" || exit 1
PROJECT_DIR="$(pwd)"

keep_open() {
  echo
  echo "----------------------------------------------------------------"
  echo "$1"
  echo "----------------------------------------------------------------"
  echo "Press Return to close this window."
  read -r _
  exit 1
}

echo "Aetherica"
echo "Folder: $PROJECT_DIR"
echo

# --- 1. Find Node -------------------------------------------------------
node_major() { "$1/node" -v 2>/dev/null | sed 's/^v//; s/\..*//'; }

find_node_bin() {
  local c m latest fallback=""
  local cands=()

  # Prefer the runtime this project was set up with, then nvm, then Homebrew.
  cands+=("$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin")
  if [ -d "$HOME/.nvm/versions/node" ]; then
    latest="$(ls -1 "$HOME/.nvm/versions/node" 2>/dev/null | sort -V | tail -1)"
    [ -n "$latest" ] && cands+=("$HOME/.nvm/versions/node/$latest/bin")
  fi
  cands+=("/opt/homebrew/bin" "/usr/local/bin")
  command -v node >/dev/null 2>&1 && cands+=("$(dirname "$(command -v node)")")

  for c in "${cands[@]}"; do
    [ -x "$c/node" ] || continue
    m="$(node_major "$c")"
    [ -z "$m" ] && continue
    # Next.js 16 needs Node 20 or newer.
    if [ "$m" -ge 20 ]; then echo "$c"; return 0; fi
    [ -z "$fallback" ] && fallback="$c"
  done

  [ -n "$fallback" ] && { echo "$fallback"; return 0; }
  return 1
}

NODE_BIN="$(find_node_bin)" || keep_open "Could not find Node.js on this Mac.
Install it from https://nodejs.org (choose the LTS version), then
double-click this file again."

export PATH="$NODE_BIN:$PATH"

if [ "$(node_major "$NODE_BIN")" -lt 20 ] 2>/dev/null; then
  keep_open "Node $("$NODE_BIN/node" -v) is too old - this site needs Node 20 or newer.
Install the LTS version from https://nodejs.org, then double-click this file again."
fi

echo "Node:   $("$NODE_BIN/node" -v)  ($NODE_BIN)"

NPM="$NODE_BIN/npm"
[ -x "$NPM" ] || NPM="$(command -v npm)"
[ -n "$NPM" ] || keep_open "Found Node but not npm. Reinstall Node.js from https://nodejs.org."

# --- 2. Settings file ---------------------------------------------------
if [ ! -f ".env.local" ]; then
  if [ -f ".env.example" ]; then
    cp ".env.example" ".env.local"
    echo "Config: created .env.local from .env.example"
  else
    keep_open "Missing .env.example - this does not look like the Aetherica project folder."
  fi
else
  echo "Config: .env.local"
fi

# --- 3. Dependencies ----------------------------------------------------
if [ ! -d "node_modules/next" ]; then
  echo
  echo "Installing dependencies (one time, a few minutes)..."
  "$NPM" install --no-audit --no-fund || keep_open "Dependency install failed.
Check your internet connection and try again. If it keeps failing,
send this whole Terminal window to Claude."
  echo "Dependencies installed."
else
  echo "Deps:   already installed"
fi

# --- 4. Free port -------------------------------------------------------
PORT=3000
while lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
  [ "$PORT" -gt 3020 ] && keep_open "Ports 3000-3020 are all busy. Restart your Mac and try again."
done

URL="http://localhost:$PORT"

# --- 5. Open the browser once the site answers --------------------------
(
  for _ in $(seq 1 120); do
    if curl -s -o /dev/null "$URL/"; then
      open "$URL"
      exit 0
    fi
    sleep 1
  done
) &

echo
echo "================================================================"
echo "  Starting the site at  $URL"
echo "  Your browser opens automatically when it is ready."
echo
echo "  Keep this window open while you browse."
echo "  To stop the site: press Control-C, or just close this window."
echo "================================================================"
echo

"$NODE_BIN/node" ./node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1 --port "$PORT"
status=$?

[ "$status" -ne 0 ] && [ "$status" -ne 130 ] && keep_open "The site stopped unexpectedly (exit code $status).
Send this whole Terminal window to Claude."
