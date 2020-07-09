import NodeGeocoder from 'node-geocoder';

class Geolocatization{
  constructor(){
    this.latitude =0;
    this.longitude =0;

    this.configureGoogleAPi();
  }

  configureGoogleAPi(){
    this.options = {
      provider: 'google',
     
      // Optional depending on the providers
      fetch: customFetchImplementation,
      apiKey: process.env.GOOGLE_API
      formatter: null // 'gpx', 'string', ...
    };
  }
}