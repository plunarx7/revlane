const adyen = (adyenKey, cardData, version) => {
  const adyenJwt = require("adyen-4.4.1")
  if (version == "jwt")
    return adyenJwt(
      cardData.number,
      cardData.expiryMonth,
      cardData.expiryYear,
      cardData.cvc,
      adyenKey
    );
  const adyenOld = require("node-adyen-encrypt")(version)
  let encryptedData = {};
  for (val of Object.keys(cardData)) {
    let newObj = {}
    newObj[val] = cardData[val]
    newObj.generationtime = new Date().toISOString()
    let cseInstance = adyenOld.createEncryption(adyenKey, {})
    console.log(cseInstance.validate(newObj))
    let encryptedVal = cseInstance.encrypt(newObj)
    encryptedData[`encrypted${val.charAt(0).toUpperCase() + val.slice(1)}`] =
      encryptedVal
  }
  delete encryptedData.encryptedGenerationTime;
  return encryptedData
};

module.exports = adyen
