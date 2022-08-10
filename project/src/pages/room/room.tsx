import Header from '../../components/header';
import PlaceCardList from '../../components/place-card-list';
import ReviewsList from '../../components/reviews-list';
import Map from '../../components/map';
import {useAppSelector} from '../../hooks/stateHooks';
import {store} from '../../store';
import {fetchNearbyOffersList, fetchOffer, fetchReviews} from '../../actions/api-actions';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {CityCoordinate} from '../../types';
import {MAP_HEIGHT} from '../../constants';
import Spinner from '../../components/spinner';

const Room = () => {
  const {id} = useParams();
  const isLoading = useAppSelector(state => state.isLoading);
  const [coordinateList, setCoordinateList] = useState<CityCoordinate[]>([]);
  const [centerCoordinate, setCenterCoordinate] = useState<CityCoordinate>({latitude: 0, longitude: 0, zoom: 0});

  useEffect(() => {
    if (id) {
      store.dispatch(fetchOffer(Number(id)));
      store.dispatch(fetchReviews(Number(id)));
      store.dispatch(fetchNearbyOffersList(Number(id)));
    }
  }, []);

  const offer = useAppSelector(state => state.offer);
  const reviews = useAppSelector(state => state.reviewsList);
  const nearbyOffersList = useAppSelector(state => state.nearbyOffersList);

  useEffect(() => {
    if (nearbyOffersList.length > 0) {
      setCoordinateList(nearbyOffersList.map(item => item.location));
      setCenterCoordinate(nearbyOffersList[0].city.location);
    }
  }, [nearbyOffersList]);

  return (
    isLoading
      ? <Spinner/>
      : <div className="page">
          <Header isLoginPage={false}/>

          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {
                    offer.images &&
                    offer.images.map(item => (
                      <div className="property__image-wrapper" key={item}>
                        <img className="property__image" src={item} alt="Photo studio"/>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {
                    offer.isPremium &&
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>
                  }
                  <div className="property__name-wrapper">
                    <h1 className="property__name">{offer.title}</h1>
                    <button className="property__bookmark-button button" type="button">
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"/>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{width: '80%'}}/>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{offer.rating}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {offer.type}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {offer.bedrooms}
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {offer.maxAdults}
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{offer.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {
                        offer.goods &&
                        offer.goods.map(item => (<li className="property__inside-item" key={item}>{item}</li>))
                      }
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                        <img className="property__avatar user__avatar"
                             src={offer.host.avatarUrl}
                             width="74"
                             height="74"
                             alt="Host avatar"/>
                      </div>
                      <span className="property__user-name">
                       {offer.host.name}
                      </span>
                      {
                        offer.host.isPro &&
                        <span className="property__user-status">
                         Pro
                        </span>
                      }
                    </div>
                    <div className="property__description">
                      <p className="property__text">
                        {offer.description}
                      </p>
                    </div>
                  </div>
                  <ReviewsList reviewsList={reviews}/>
                </div>
              </div>
              <section className="property__map map">
                <Map centerCoordinate={centerCoordinate} listCoordinate={coordinateList} mapHeight={MAP_HEIGHT}/>
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <PlaceCardList cardList={nearbyOffersList}/>
              </section>
            </div>
          </main>
        </div>
  );
};

export default Room;
