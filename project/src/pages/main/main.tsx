import Header from '../../components/header';
import PlaceCardList from '../../components/place-card-list';
import Map from './../../components/map';
import LocationsList from '../../components/locations-list';
import {Card, CityCoordinate} from '../../types';
import {CITIES_LIST, DEFAULT_MAP_HEIGHT} from '../../constants';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../hooks/stateHooks';
import Spinner from '../../components/spinner';

const Main = () => {
  const currentCity = useAppSelector(state => state.city);
  const offersList = useAppSelector(state => state.offersList);
  const isLoading = useAppSelector(state => state.isLoading);

  const [offersListByCity, setOffersListByCity] = useState<Card[]>([]);
  const [coordinateList, setCoordinateList] = useState<CityCoordinate[]>([]);
  const [centerCoordinate, setCenterCoordinate] = useState<CityCoordinate>({latitude: 0, longitude: 0, zoom: 0});

  useEffect(() => {
    if (offersList.length > 0) {
      const filteredList = offersList.filter(item => item.city.name === currentCity);
      setOffersListByCity(filteredList);
      setCoordinateList(filteredList.map(item => item.location));
      setCenterCoordinate(filteredList[0]?.city.location);
    }
  }, [currentCity, isLoading]);


  return (
    <div className="page page--gray page--main">
      <Header isLoginPage={false}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList citiesList={CITIES_LIST}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${offersListByCity.length} places to stay in ${currentCity}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"/>
                    </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              {!isLoading && <PlaceCardList cardList={offersListByCity}/>}
              {isLoading && <Spinner/>}
            </section>
            <div className="cities__right-section">
              <div className="cities__map map">
                <Map centerCoordinate={centerCoordinate} listCoordinate={coordinateList} mapHeight={DEFAULT_MAP_HEIGHT}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
