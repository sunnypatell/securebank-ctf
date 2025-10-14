#!/bin/sh
set -e

APP_HOME="/app"
DATA_DIR="${DATA_DIR:-${APP_HOME}/data}"
SEED_DB="${APP_HOME}/seed/database.sqlite"
TARGET_DB="${DATA_DIR}/database.sqlite"
APP_DB="${APP_HOME}/database.sqlite"

# Provide a sane default for local training while allowing overrides
if [ -z "${COOKIE_SECRET:-}" ]; then
  export COOKIE_SECRET="p9Y!2m@lK8z$1WqA7&dE4Xu0Cj"
  echo "[startup] COOKIE_SECRET not provided; using bundled training value."
fi

mkdir -p "${DATA_DIR}"

if [ ! -f "${TARGET_DB}" ]; then
  echo "[startup] Seeding database from pristine snapshot."
  cp "${SEED_DB}" "${TARGET_DB}"
else
  echo "[startup] Using existing database from ${TARGET_DB}."
fi

# Link the application database path to the persisted copy
ln -sf "${TARGET_DB}" "${APP_DB}"

exec npm run start -- --hostname "${HOST:-0.0.0.0}" --port "${PORT:-3000}"
