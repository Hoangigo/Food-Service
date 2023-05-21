# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

ENV PORT=8000
# Expose the port your backend application will run on (e.g., 8000)
EXPOSE 8000

# Start the backend application when the container starts
CMD ["npm", "start"]