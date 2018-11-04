"use strict";

require('dotenv').load();

var client = require("dnsimple")({
  baseUrl: 'https://api.sandbox.dnsimple.com',
  accessToken: process.env.TOKEN,
});