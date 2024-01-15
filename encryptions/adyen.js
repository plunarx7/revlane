const encryptCardData = require('adyen-4.4.1')
const adyenEncrypt = require('node-adyen-encrypt')(24)

const card = '4242424242424242';
const month = '12';
const year = '2023';
const cvc = '123';
const holderName = 'james lopez';

const adyenKey = '10001|BDDBC3D5D295D76130434778B66DC95CF149DDBEEA8FB8FAC22415FAE7EB02C9530DA04859786CB5D07278D3F9DFE46463A21F94B4DBBDF1C42AEC2F69BB60FC7409177ECC80ADB2117C075C408CFFB102C4DB22D6D96FC3D85ECF337A63355761B3A33B2B2AB00BC8E3BA02C498322132D1C88331FFA26CF9AF1509D1150DE3B1A4F551BF7E0E6799B23204CEE3050A4DE9FDEF3E7C1A613CD5A7A306EEA1EF77213CFEF181006D0A7D4BF2C738734FE272523DC77C288B47D16E4DC39519017199DFEDEB94FC9343864AC6A07B5F9EFBCA22D1BCA01DFC7019B3100E2D216A12A9F09FEDEB2AEAFA7D0C1E8F201D9DBF6E162160623EF502BC8151585C44BD';

// console.log(encryptCardData(card, month, year, cvc, adyenKey))

const cardData = {
  number : card,       // 'xxxx xxxx xxxx xxxx'
  cvc : cvc,                 //'xxx'
  holderName : holderName,   // 'John Doe'
  expiryMonth : month, //'MM'
  expiryYear : year,   // 'YYYY'
  generationtime : new Date().toISOString()
};

let newData = {1: true, 2: false}

for(value of Object.keys(newData)) {
  newData?.value
}

// console.log(cardData.generationtime)
const config = {};
const cseInstance = adyenEncrypt.createEncryption(adyenKey, config)
cseInstance.validate(cardData)
const encryptedData = cseInstance.encrypt(cardData)
// console.log(encryptedData);