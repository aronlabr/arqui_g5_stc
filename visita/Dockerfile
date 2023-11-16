# Use the official Node.js image as the base image
FROM node:20.8.1-alpine3.18
# Set the working directory in the container
WORKDIR /app
# Install dependencies
COPY package*.json .
# Install dependencies
RUN npm install
# Add your application code to the container
COPY . .
# Start your Node.js application
CMD [ "npm", "start" ]