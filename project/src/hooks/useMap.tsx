import {MutableRefObject, useEffect, useState, useRef} from 'react';
import leaflet, {Map} from 'leaflet';
import {CityCoordinate} from '../types';

const useMap = (mapRef: MutableRefObject<HTMLElement | null>, coordinate: CityCoordinate): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && map === null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: coordinate.lat,
          lng: coordinate.lng,
        },
        zoom: coordinate.zoom,
      });
      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, map, coordinate]);
  return map;
};

export default useMap;

