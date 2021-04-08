# Build with docker build --rm -t name_of_image . to prevent intermediary images from being saved
# Build stage, start from official base image
FROM node:15 as vue-build-stage
# Specify the working directory as /app
WORKDIR /app
# Copy over package dependency lists
COPY package*.json ./
RUN npm install
# Copy over all the files in this directory into the container's working directory
COPY . .
RUN npm run build
# Run the web service on container startup.
CMD [ "npm", "start" ]

# Run with docker run -it -p 8080:8080 name_of_image
#TODO: For a production app, concerned with higher performance, should put an nginx server in front of this.
