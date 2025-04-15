# Use Node base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy only the app's package manifests
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY frontend/ ./

# Create backup directory and store clean DB
RUN mkdir -p /app/backup
COPY frontend/database.sqlite /app/backup/database.sqlite

# Add startup script to restore DB each run
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Expose frontend port
EXPOSE 3000

# Launch with script (resets DB and starts server)
CMD ["./start.sh"]
