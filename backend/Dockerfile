# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Expose port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
