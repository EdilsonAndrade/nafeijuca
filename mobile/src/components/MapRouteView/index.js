import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import { GMAPS_KEY } from 'react-native-dotenv';
import {
  MarkerView, MarkerIcon, MarkerContainer, MakertTextsContainer, MarkerTitle,
} from './styles';

const MapRouteView = ({
  destLat, destLong, calcDistanceDone, width, height,
}) => {
  const user = useSelector((state) => state.user);
  const myRegion = {
    latitude: user.latitude, longitude: user.longitude, longitudeDelta: 0.0134, latitudeDelta: 0.0143,
  };
  const destination = {
    latitude: parseFloat(destLat), longitude: parseFloat(destLong),
  };
  const mapViewRef = useRef();
  return (
    <MapView
      style={{
        height: width,
        width: height,


      }}
      ref={mapViewRef}
      minZoomLevel={15}
      region={myRegion}
      loadingEnabled
    >
      <Marker
        coordinate={myRegion}
      >
        <MarkerView>
          <MarkerContainer>
            <MakertTextsContainer>
              <MarkerTitle>Local de entrega!</MarkerTitle>
            </MakertTextsContainer>
            <MarkerIcon name="room" size={42} />
          </MarkerContainer>
        </MarkerView>
      </Marker>
      <MapViewDirections
        origin={myRegion}
        destination={destination}
        apikey={GMAPS_KEY}
        onReady={(result) => calcDistanceDone(result)}
        strokeWidth={3}
        strokeColor="#ffc700"
      />
    </MapView>
  );
};

export default MapRouteView;
