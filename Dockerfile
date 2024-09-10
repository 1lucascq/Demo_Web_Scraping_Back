# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Install necessary dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libxdamage1 \
  libxcomposite1 \
  libxrandr2 \
  libgbm-dev \
  libnss3 \
  libxss1 \
  libgconf-2-4 \
  lsb-release \
  wget \
  xdg-utils \
  --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
