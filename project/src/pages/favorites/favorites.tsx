import Header from '../../components/header';
import PlaceCardsList from '../../components/place-cards-list';
import {store} from '../../store';
import {fetchFavoriteOffersList} from '../../actions/api-actions';
import {useAppSelector} from '../../hooks/stateHooks';
import {useEffect} from 'react';
import NoFavoriteMessage from '../../components/no-favorite-message';

const Favorites = () => {
  useEffect(() => {
    store.dispatch(fetchFavoriteOffersList());
  }, []);
  const favoriteOffers = useAppSelector(state => state.favoriteOffersList);
  const favoriteCities = new Set(favoriteOffers.map(item => item.city.name));
  const offersListByCity = Array.from(favoriteCities).map((city: string) =>
    ({
      name: city,
      list: [...favoriteOffers.filter(item => item.city.name === city)]
    }));

  return (
    <div className="page">
      <Header isLoginPage={false}/>

      {offersListByCity.length > 0 &&
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  offersListByCity.map(item => (
                    <li className="favorites__locations-items" key={item.name}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{item.name}</span>
                          </a>
                        </div>
                      </div>
                      <PlaceCardsList cardsList={item.list}/>
                    </li>
                  ))
                }
              </ul>
            </section>
          </div>
        </main>}
      {!offersListByCity.length && <NoFavoriteMessage/>}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

export default Favorites;
