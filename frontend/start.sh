#!/bin/sh
# for DOCKERFILE BUILD, encoding is LF NOT CLRF in UTF-8
# Reset the DB on each start
cp /app/backup/database.sqlite /app/database.sqlite

# Run Next.js app
npm run build && npm run start
