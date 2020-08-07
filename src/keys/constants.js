const username = "586VAIBH0637";

export const priceCalculatorUrl = (
  source,
  destination,
  weight,
  ounce,
  service,
  firstClassMailType
) => {
  const priceApi = `https://secure.shippingapis.com/shippingapi.dll?API=RateV4&XML=%3CRateV4Request%20USERID=%22918ABCIN6917%22%3E%20%3CRevision%3E2%3C/Revision%3E%20%3CPackage%20ID=%221ST%22%3E%20%3CService%3E${service}%3C/Service%3E%20%3CFirstClassMailType%3E${firstClassMailType}%3C/FirstClassMailType%3E%20%3CZipOrigination%3E${source}%3C/ZipOrigination%3E%20%3CZipDestination%3E${destination}%3C/ZipDestination%3E%20%3CPounds%3E${weight}%3C/Pounds%3E%20%3COunces%3E${ounce}%3C/Ounces%3E%20%3CContainer%3E%3C/Container%3E%20%3CWidth%3E%3C/Width%3E%20%3CLength%3E%3C/Length%3E%20%3CHeight%3E%3C/Height%3E%20%3CGirth%3E%3C/Girth%3E%20%3CMachinable%3Efalse%3C/Machinable%3E%20%3C/Package%3E%20%3C/RateV4Request%3E`;
  return priceApi;
};
