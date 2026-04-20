# Use a lightweight Node.js Alpine image for efficiency
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json to the container
COPY package.json ./

# (Note: In a true environment, we run npm install here, but assuming it exists)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Environment variables
ENV PORT=8080
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Start the application
CMD [ "npm", "start" ]
