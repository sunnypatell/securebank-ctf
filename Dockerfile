# Use Node base image (has OSV Vuln.)
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package manifests and install deps
COPY frontend/package*.json ./
RUN npm ci

# Copy rest of the app
COPY frontend .

# Copy clean backup DB and overwrite DB on every container run
RUN mkdir -p /app/backup
COPY frontend/database.sqlite /app/backup/database.sqlite

# Start script will restore DB each time
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose app port
EXPOSE 3000

# Start the app through custom script
CMD ["/app/start.sh"]
