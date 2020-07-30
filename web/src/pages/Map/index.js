import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { Container, MapContent } from './styles';

function Map() {
  const user = useSelector(state => state.user);
  const [map, setMap] = useState();
  const { latitude, longitude } = user.store;

  useEffect(() => {
    const returnedMap = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiZWFhY29uc3VsdGluZ3RlY25vbG9naWEiLCJhIjoiY2tkOTFld2Q4MDdqajJ6cXJhNnQ4MzZuNSJ9.KkA3dEhEBttPGV1B72NGzw',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      trackResize: true,
      container: 'mapContainer',
      center: [longitude, latitude],
      hash: true,
      zoom: 14.1,
      attributionControl: true,
    });
    new mapboxgl.Marker({
      color: 'red',
      scale: 2,
      style:
    })
      .setLngLat([longitude, latitude])
      .addTo(returnedMap);
  }, [latitude, longitude]);

  return (
    <Container>
      <MapContent id="mapContainer" />
    </Container>
  );
}
export default Map;
