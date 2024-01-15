const crypto = require('crypto');

// JWK
const jwk = {
  "kty": "RSA",
  "e": "AQAB",
  "use": "enc",
  "n": "uiPOv2IqhIzglMXOkZ5Y894I8q8GQeefR9RAx7n1rlouYb7EUKZ5ecLtrqHa66DZSGFuxxkqtIBVAUrR8N90JQWi9p48cMAxpf3h81MIEWpaUj9l9lQnzfdLEhD9UmV6PVPI1pMs0Hkit4LTey1Q8z6WqS5lmnxeYGA0BgGTXSOpgZrqlyxhGK2JoCrhtBeRDFeKtoQYtkWIqLYyKvGwQitGqYaa_vffLuTNsqf2dLhDvLFloRQxIhf4FrLlIkQ-sg2JFOBA4zNc0kIfi8k3tN9FiL7O5r0mMpLWZsDb509qD3xw5-atw1mKtPcp1_FVus50bXsBuF-efU_-E67nvw"
};

// Card number to encrypt
const cardNumber = "4111111111111111";

// Convert JWK to RSA public key
const publicKey = crypto.createPublicKey({
  key: jwk,
  format: 'jwk'
});

console.log(publicKey)

// Encrypt the card number
const encryptedData = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
  },
  Buffer.from(cardNumber)
);

// Encrypted data in base64
const encryptedBase64 = encryptedData.toString('base64');

console.log("Encrypted Card Number:", encryptedBase64);
