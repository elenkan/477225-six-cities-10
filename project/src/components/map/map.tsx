import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRef, useEffect} from 'react';
import {CityCoordinate} from '../../types';
import useMap from '../../hooks/useMap';
import {CUSTOM_ICON, CUSTOM_ACTIVE_ICON} from '../../constants';
import {useAppSelector} from '../../hooks/stateHooks';

type PropsType = {
  centerCoordinate: CityCoordinate,
  coordinatesList: CityCoordinate[],
  mapHeight: string,
  selectedLocation?: CityCoordinate | null
}

const Map = ({centerCoordinate, coordinatesList, mapHeight, selectedLocation}: PropsType) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, centerCoordinate);
  const currentCity = useAppSelector(state => state.city);

  useEffect(() => {
    if (map) {
      coordinatesList.forEach(point => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: JSON.stringify(point) === JSON.stringify(selectedLocation) ? CUSTOM_ACTIVE_ICON : CUSTOM_ICON
          })
          .addTo(map);
      });
    }
  }, [map, centerCoordinate, coordinatesList, selectedLocation, currentCity]);


  return (
    <div style={{minHeight: mapHeight, height: '100%'}} ref={mapRef}/>
  );
};

export default Map;
