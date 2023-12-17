# Use the official Node.js image as the base image
FROM node:lts-alpine3.19
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