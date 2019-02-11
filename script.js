"use strict";
require("dotenv").load();
const fs = require("fs-extra");

const client = require("dnsimple")({
  accessToken: process.env.DNSIMPLE_API_TOKEN
});

async function getDomainId(accountId, domainName) {
  let response = await client.domains.getDomain(accountId, domainName);
  return response.data.id;
}

async function getCertId(accountId, domainId) {
  let response = await client.certificates.listCertificates(
    accountId,
    domainId
  );
  return response.data[0].id;
}

async function getCertificate(accountId, domainId, certId) {
  let response = await client.certificates.downloadCertificate(
    accountId,
    domainId,
    certId
  );
  let fullChain = [response.data.server, ...response.data.chain];
  return fullChain.join("\n");
}

async function getPrivateKey(accountId, domainId, certId) {
  let response = await client.certificates.getCertificatePrivateKey(
    accountId,
    domainId,
    certId
  );
  return response.data.private_key;
}

async function run() {
  try {
    let accountId = process.env.DNSIMPLE_ACCOUNT_ID;
    let domain = process.env.DOMAIN_NAME;
    let certFile = process.env.SAVED_CERT_FILE;
    let privateKeyFile = process.env.SAVED_PRIVATE_KEY_FILE;

    let domainId = await getDomainId(accountId, domain);
    let certId = await getCertId(accountId, domainId);

    let certificate = await getCertificate(accountId, domainId, certId);
    await fs.writeFile(certFile, certificate);

    let privateKey = await getPrivateKey(accountId, domainId, certId);
    await fs.writeFile(privateKeyFile, privateKey);
  } catch (e) {
    console.log("Something went wrong...");
    console.log(e);
  }
}

run();
