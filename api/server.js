require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const app = express();

const checkScopes = jwtAuthz(["read:posts"]);

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.ISSUER_BASE_URL}.well-known/jwks.json`,
  }),
  audience: process.env.ALLOWED_AUDIENCES,
  issuer: process.env.ISSUER_BASE_URL,
  algorithms: ["RS256"],
});

app.use(jwtCheck);
app.use(cors());
app.get("/", (req, res) => {
  res.send([
    {
      date: new Date(),
      description: "Let's just be happy!",
      words: 1000,
    },
    {
      date: new Date(),
      description: "Why Auth0 is so cool",
      words: 2000,
    },
  ]);
});

app.listen(process.env.API_PORT);
