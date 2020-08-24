# Piti - API

RESTful API for the Piti training app, created with Node.js, Express and GraphQL. 

## History 

At first the app's backend was created using Strapi - Headless CMS. It was, however, an overkill since all of the application data was managed from the frontend level anyway. The Strapi admin panel was thereby unnecessary, just the API was enough. 

I decided to create it myself. The data is created, deleted, fetched or modified using a GraphQL endpoint. Its shape and means to access it is determined by the GraphQL schemas and resolvers. The new API is basically a copy of the one which was created with Strapi.  

I realized, however, that after connecting the app to the new API, it started to work faster.

## Local testing

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:1337
$ npm run develop