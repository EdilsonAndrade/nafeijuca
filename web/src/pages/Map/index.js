import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { Container, MapContent } from './styles';

function Map() {
  const user = useSelector(state => state.user);

  const { latitude, longitude } = user.store;
  const size = 150;

  useEffect(() => {
    const returnedMap = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiZWFhY29uc3VsdGluZ3RlY25vbG9naWEiLCJhIjoiY2tkOTFld2Q4MDdqajJ6cXJhNnQ4MzZuNSJ9.KkA3dEhEBttPGV1B72NGzw',
      style: 'mapbox://styles/mapbox/streets-v9',
      trackResize: true,
      container: 'mapContainer',
      center: [longitude, latitude],
      hash: true,
      zoom: 14,
      attributionControl: true,
    });
    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
      onAdd: () => {
        const canvas = document.createElement('canvas');
        canvas.width = pulsingDot.width;
        canvas.height = pulsingDot.height;
        pulsingDot.context = canvas.getContext('2d');
      },
      render: () => {
        const duration = 1500;
        const t = (performance.now() % duration) / duration;
        const radius = (size / 2) * 0.2;
        const outerRadius = size / 2;
        const { context } = pulsingDot;
        context.clearRect(0, 0, pulsingDot.width, pulsingDot.height);

        context.beginPath();
        context.arc(
          pulsingDot.width / 2,
          pulsingDot.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = `rgba(255, 199, 0, ${1 - t})`;
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(
          pulsingDot.width / 2,
          pulsingDot.height / 2,
          radius,
          0,
          Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 1 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        pulsingDot.data = context.getImageData(
          0,
          0,
          pulsingDot.width,
          pulsingDot.height
        ).data;

        // continuously repaint the map, resulting in the smooth animation of the dot
        returnedMap.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
      },
    };

    returnedMap.on('load', () => {
      returnedMap.addImage('pulsing-dot', pulsingDot, { pixelRatio: 1 });

      returnedMap.addSource('points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
            },
          ],
        },
      });
      returnedMap.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'points',
        layout: {
          'icon-image': 'pulsing-dot',
        },
      });
    });

    new mapboxgl.Marker({
      color: '#ffc700',
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
