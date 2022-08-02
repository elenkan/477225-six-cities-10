import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRef, useEffect} from 'react';
import {CityCoordinate} from '../../types';
import useMap from '../../hooks/useMap';

type PropsType = {
  centerCoordinate: CityCoordinate,
  listCoordinate: CityCoordinate[]
}

const Map = ({centerCoordinate, listCoordinate}: PropsType) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, centerCoordinate);
  const currentCustomIcon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      listCoordinate.forEach((point) => {
        leaflet
          .marker({
            lat: point.lat,
            lng: point.lng,
          }, {
            icon: currentCustomIcon
          })
          .addTo(map);
      });
    }
  }, [map, listCoordinate]);


  return (
    <div style={{height: '512px'}} ref={mapRef}/>
  );
};

export default Map;
