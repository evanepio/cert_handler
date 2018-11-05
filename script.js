"use strict";
require('dotenv').load();

var client = require("dnsimple")({
  accessToken: process.env.DNSIMPLE_API_TOKEN,
});

async function getDomainId(accountId, domainName) {
  let response = await client.domains.getDomain(accountId, domainName);
  return response.data.id;
}

async function getCertId(accountId, domainId) {
  let response = await client.certificates.listCertificates(accountId, domainId);
  return response.data[0].id;
}

async function getCertificate(accountId, domainId, certId) {
  let response = await client.certificates.downloadCertificate(accountId, domainId, certId);
  let fullChain = [response.data.server, ...response.data.chain];
  return fullChain.join("\n");
}

async function run() {
  let accountId = process.env.DNSIMPLE_ACCOUNT_ID;
  let domain = process.env.DOMAIN_NAME
  let domainId = await getDomainId(accountId, domain);
  let certId = await getCertId(accountId, domainId);
  let certificate = await getCertificate(accountId, domainId, certId);
  console.log(certificate);
}

run();