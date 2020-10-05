import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Container, MapContent } from './styles';
import mapSource from '../../assets/bairrossaopaulo.geojson';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const Map = () => {
  const user = useSelector(state => state.user);

  const { latitude, longitude } = user.store;
  const size = 150;
  const updateArea = e => {
    console.log(e);
  };
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

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });

    returnedMap.addControl(draw, 'top-left');

    returnedMap.on('draw.create', updateArea);
    returnedMap.on('draw.delete', updateArea);
    returnedMap.on('draw.update', updateArea);

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

    const hoveredStateId = null;
    returnedMap.on('load', () => {
      returnedMap.addSource('states', {
        type: 'geojson',
        data: mapSource,
      });

      // returnedMap.addLayer({
      //   id: 'selectedAreas',
      //   type: 'fill',
      //   source: 'newlayers',
      //   paint: {
      //     'fill-outline-color': '#ffc700',
      //     'fill-color': '#ffc700',
      //     'fill-opacity': 0.75,
      //   },
      // });

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
      returnedMap.addLayer({
        id: 'cirleradius',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-blur': 1,
          'circle-color': '#fff',
          'circle-radius': 100,
        },
      });

      returnedMap.addLayer({
        id: 'states-layer',
        type: 'fill',
        source: 'states',
        paint: {
          'fill-outline-color': '#484896',
          'fill-color': '#6e599f',
          'fill-opacity': 0.5,
        },
      });

      returnedMap.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'states',
        layout: {},
        paint: {
          'line-color': '#627BC1',
          'line-width': 2,
        },
      });

      returnedMap.on('click', e => {
        // const features = returnedMap.queryRenderedFeatures([
        //   e.lngLat.lng,
        //   e.lngLat.lat,
        // ]);
        //        returnedMap.setPaintProperty('state-borders', 'line-color', '#ffc700');
        // returnedMap.addLayer({
        //   id: Math.random().toString(),
        //   type: 'fill',
        //   source: sourceId,
        //   paint: {
        //     'fill-color': '#FF0000',
        //     'fill-outline-color': '#FF0000',
        //   },
        // });
      });

      //   returnedMap.on('mouseleave', 'stateFills', () => {
      //     if (hoveredStateId) {
      //       returnedMap.setFeatureState(
      //         { source: 'states', id: hoveredStateId },
      //         { hover: false }
      //       );
      //     }
      //     hoveredStateId = null;
      //   });
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
};
export default Map;
