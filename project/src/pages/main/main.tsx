import Header from '../../components/header';
import PlaceCardList from '../../components/place-card-list';
import Map from './../../components/map';
import LocationsList from '../../components/locations-list';
import {Card, CityCoordinate} from '../../types';
import {CITIES_LIST, DEFAULT_MAP_HEIGHT} from '../../constants';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../hooks/stateHooks';
import Spinner from '../../components/spinner';
import SortingList from '../../components/sorting-list';
import NoOffersMessage from '../../components/no-offers-message';
import {store} from '../../store';
import {fetchFavoriteOffersList, fetchOfferList} from '../../actions/api-actions';

const Main = () => {
  const currentCity = useAppSelector(state => state.city);
  const offersList = useAppSelector(state => state.offersList);
  const isLoading = useAppSelector(state => state.isLoading);
  const cardId = useAppSelector(state => state.cardId);

  const [offersListByCity, setOffersListByCity] = useState<Card[]>([]);
  const [coordinateList, setCoordinateList] = useState<CityCoordinate[]>([]);
  const [centerCoordinate, setCenterCoordinate] = useState<CityCoordinate>({latitude: 0, longitude: 0, zoom: 0});
  const [sortingType, setSortingType] = useState<string>('popular');
  const [defaultList, setDefaultList] = useState<string>(JSON.stringify(offersListByCity));
  const [selectedLocation, setSelectedLocation] = useState<CityCoordinate|null>({latitude: 0, longitude: 0, zoom: 0});
  const [message, setMessage] = useState<boolean>(false);

  useEffect(() => {
    store.dispatch(fetchFavoriteOffersList());
    if (offersList.length) {
      store.dispatch(fetchOfferList());
    }
  }, []);

  useEffect(() => {
    if (offersList.length > 0) {
      const filteredList = offersList.filter(item => item.city.name === currentCity);
      setOffersListByCity(filteredList);
      setDefaultList(JSON.stringify(filteredList));
      setCoordinateList(filteredList.map(item => item.location));
      setCenterCoordinate(filteredList[0]?.city.location);
      setMessage(false);
    }
    if (!offersList.length && isLoading) {
      setMessage(true);
    }
  }, [currentCity, isLoading]);

  useEffect(() => {
    if (sortingType === 'low') {
      setOffersListByCity(offersListByCity.sort((a: Card,b: Card) => a.price - b.price));
    }

    if (sortingType === 'high') {
      setOffersListByCity(offersListByCity.sort((a: Card,b: Card) => b.price - a.price));
    }

    if (sortingType === 'rating') {
      setOffersListByCity(offersListByCity.sort((a: Card,b: Card) => b.rating - a.rating));
    }

    if (sortingType === 'popular') {
      setOffersListByCity(JSON.parse(defaultList));
    }
  }, [sortingType]);

  useEffect(() => {
    const element = offersListByCity.find(item => item.id === cardId);
    if (cardId && element) {
      setSelectedLocation(element.location);
    } else {
      setSelectedLocation(null);
    }
  }, [cardId]);

  return (
    <div className="page page--gray page--main">
      <Header isLoginPage={false}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList citiesList={CITIES_LIST}/>
        </div>
        <div className="cities">
          {offersListByCity.length > 0 &&
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${offersListByCity.length} places to stay in ${currentCity}`}</b>
                <SortingList action={setSortingType}/>
                {!isLoading && <PlaceCardList cardList={offersListByCity}/>}
                {isLoading && <Spinner/>}
              </section>
              <div className="cities__right-section">
                <div className="cities__map map">
                  <Map centerCoordinate={centerCoordinate}
                       listCoordinate={coordinateList}
                       selectedLocation={selectedLocation}
                       mapHeight={DEFAULT_MAP_HEIGHT}/>
                </div>
              </div>
            </div>}
          {message && <NoOffersMessage currentCity={currentCity}/>}
        </div>
      </main>
    </div>
  );
};

export default Main;
