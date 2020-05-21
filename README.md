# Toodies-API
The Toodies API for the official [Toodies Web App](https://github.com/Joelrodiel/Toodies).

# How to run
First, a MongoDB server with a collection named `toodies` has to run on the local host.

Create a environment variable (either with a `.env` or through other means) with a key named `dbURL` holding the url of the MongoDB server.

Then to execute just run `npm run start`. The API should start on `localhost:3000`, or a port you specify in the environment variable `PORT` (defaults to 3000).
