import Header from '../../components/header';
import PlaceCardList from '../../components/place-card-list';
import Map from './../../components/map';
import LocationsList from '../../components/locations-list';
import {Card} from '../../types';
import {CITIES_LIST} from '../../constants';
import {useAppSelector, useAppDispatch} from '../../hooks/stateHooks';
import {useEffect, useState} from 'react';
import citiesData from '../../mocks/citiesData';
import mapData from './../../mocks/map';
import {setCurrentOffersList} from '../../actions/actions';

const Main = () => {
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  const [offersList, setOffersList] = useState<Card[]|[]>([]);

  const getCurrentOffersList = (city:string) => {
    const list:Card[] = citiesData[city].list;
    dispatch(setCurrentOffersList(list));
    setOffersList(list);
  };

  useEffect(() => {
    getCurrentOffersList(currentCity);
  },[currentCity]);


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
              <b className="places__found">{`${offersList.length} places to stay in ${currentCity}`}</b>
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
              <PlaceCardList cardList={offersList}/>
            </section>
            <div className="cities__right-section">
              <div className="cities__map map">
                <Map centerCoordinate={mapData.city} listCoordinate={mapData.points} mapHeight="512px"/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
