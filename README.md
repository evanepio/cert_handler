# Cert Handler

This is a simple node script to get the certificate and private key from DNSimple API and place them where they need to be.

You need the following environment variables:

* `DNSIMPLE_API_TOKEN` - You'll need to generate and access token with DNSimple's API in order to call it.
* `DNSIMPLE_ACCOUNT_ID` - your DNSimple account ID
* `DOMAIN_NAME` - the domain for which you're downloading the cert and key
* `SAVED_CERT_FILE` - the file name to save the full chain certificate to. It must be an absolute path!
* `SAVED_PRIVATE_KEY_FILE` - the file name to save the private key to. It must be an absolute path!

This saves the cert and privarte key to a file using the experimental Node File System Promises API. Super safe, if you like `(node:48793) ExperimentalWarning: The fs.promises API is experimental` in your console.