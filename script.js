"use strict";

var client = require("dnsimple")({
  accessToken: process.env.TOKEN,
});

console.log(client)