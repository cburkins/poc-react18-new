const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

// if NOT deployed to "production" (e.g. running locally), then load env vars from .env file
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Adds "body" key to req object (it's {} if body was not present)
app.use(express.json());

// urlencoded used to be part of bodyparser, not 100% sure why this is needed (was in tutorial)
app.use(express.urlencoded({ extended: true }));

// Logger
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url} ${res.statusCode}`);
    next();
});

// New API Route
app.get("/getdata", (req, res) => {
    // On local dev, env vars comes from .env file (in top-level server directory)
    // On deployed "prod", comes from env vars (heroku uses WebUI, dokku uses CLI)
    // dokku CLI example:    dokku config:set test05 VAR01=Value01
    // This is an appropriate place to store passwords (e.g. for an external API)
    // Though you obviously don't want to send them out to the client like this demo :)
    res.send(`Hello from the API, VAR01=${process.env.VAR01}`);
});

// API route that serves our client (should be last)
if (process.env.NODE_ENV === "production") {
    // if this is a deployed instance (e.g. on Heroku or dokku), then serve any static files (e.g. our React Client)
    app.use(express.static(path.join(__dirname, "client/build")));
    // Handle React routing, return all requests to React app (i.e. deeper links get redirect to /client/build/index.html)
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

// Start actively listening on designated port
app.listen(port, () => console.log(`Listening on port ${port}`));
