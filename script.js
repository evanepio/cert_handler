"use strict";
require('dotenv').load();

var client = require("dnsimple")({
  accessToken: process.env.DNSIMPLE_API_TOKEN,
});

async function getDomainId(domainName) {
  let response = await client.domains.getDomain(process.env.DNSIMPLE_ACCOUNT_ID, domainName);
  return response.data.id;
}

async function getCertId(domainId) {
  let response = await client.certificates.listCertificates(process.env.DNSIMPLE_ACCOUNT_ID, domainId);
  return response.data[0].id;
}

async function getCertificate(domainId, certId) {
  let response = await client.certificates.downloadCertificate(process.env.DNSIMPLE_ACCOUNT_ID, domainId, certId);
  let fullChain = [response.data.server, ...response.data.chain];
  return fullChain.join("\n");
}

async function getStuff() {
  let domainId = await getDomainId(process.env.DOMAIN_NAME);
  let certId = await getCertId(domainId);
  let certificate = await getCertificate(domainId, certId);
  console.log(certificate);
}

getStuff();