import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRef, useEffect} from 'react';
import {CityCoordinate} from '../../types';
import useMap from '../../hooks/useMap';
import {CUSTOM_ICON} from '../../constants';

type PropsType = {
  centerCoordinate: CityCoordinate,
  listCoordinate: CityCoordinate[],
  mapHeight: string
}

const Map = ({centerCoordinate, listCoordinate, mapHeight}: PropsType) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, centerCoordinate);

  useEffect(() => {
    if (map) {
      listCoordinate.forEach(point => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: CUSTOM_ICON
          })
          .addTo(map);
      });
    }
  }, [map, centerCoordinate, listCoordinate]);


  return (
    <div style={{height: mapHeight}} ref={mapRef}/>
  );
};

export default Map;
