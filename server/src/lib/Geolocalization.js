import NodeGeocoder from 'node-geocoder';

class Geolocatization {
  constructor() {
    this.latitude = null;
    this.longitude = null;
    this.found = false;
    this.configureGoogleAPi();
  }

  configureGoogleAPi() {
    this.options = {
      provider: 'google',
      apiKey: process.env.GOOGLE_API,
    };
  }

  async findLatAndLongByZipCode(options) {
    const geocoder = NodeGeocoder(this.options);
    const res = await geocoder.geocode(options);

    if (res.length > 0) {
      this.latitude = res[0].latitude;
      this.longitude = res[0].longitude;
      this.zipcode = res[0].zipcode;
      this.found = true;
    } else {
      this.latitude = null;
      this.longitude = null;
    }
    return this;
  }
}
export default new Geolocatization();
