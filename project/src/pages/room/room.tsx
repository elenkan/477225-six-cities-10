import Header from '../../components/header';
import PlaceCardsList from '../../components/place-cards-list';
import ReviewsList from '../../components/reviews-list';
import Map from '../../components/map';
import {useAppSelector} from '../../hooks/stateHooks';
import {store} from '../../store';
import {fetchNearbyOffersList, fetchOffer, fetchReviews} from '../../actions/api-actions';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {CityCoordinate, Review} from '../../types';
import {MAP_HEIGHT, REVIEWS_LIMIT_COUNT} from '../../constants';
import Spinner from '../../components/spinner';
import {AppRouteList} from '../../router/enums';
import {setIsRedirect} from '../../actions/actions';
import RatingStars from '../../components/rating-stars';
import FavoriteButton from '../../components/favorite-button';
import moment from 'moment';

const Room = () => {
  const {id} = useParams();
  const isLoading = useAppSelector(state => state.isLoading);
  const [coordinatesList, setCoordinatesList] = useState<CityCoordinate[]>([]);
  const [centerCoordinate, setCenterCoordinate] = useState<CityCoordinate>({latitude: 0, longitude: 0, zoom: 0});
  const navigate = useNavigate();
  const [sortedReviewsList, setSortedReviewsList] = useState<Review[]>([]);
  const offer = useAppSelector(state => state.offer);
  const isRedirect = useAppSelector(state => state.isRedirect);

  useEffect(() => {
    store.dispatch(fetchOffer(Number(id)));
  }, []);

  useEffect(() => {
    if (isRedirect) {
      navigate(AppRouteList.NotFoundPage);
      store.dispatch(setIsRedirect(false));
    }
  }, [isRedirect]);

  useEffect(() => {
    if (offer.id) {
      store.dispatch(fetchReviews(Number(id)));
      store.dispatch(fetchNearbyOffersList(Number(id)));
    }
  }, [offer.id]);

  const reviews = useAppSelector(state => state.reviewsList);
  const nearbyOffersList = useAppSelector(state => state.nearbyOffersList);

  useEffect(() => {
    if (reviews.length) {
      const sortedReviews = [...reviews].sort((a,b) => moment(b.date, 'DD-MM-YYYY').diff(moment(a.date,'DD-MM-YYYY')));
      setSortedReviewsList(sortedReviews);
    }
  },[reviews]);

  useEffect(() => {
    if (nearbyOffersList.length > 0) {
      const nearbyList = nearbyOffersList.map(item => item.location);
      nearbyList.push(offer.location);
      setCoordinatesList(nearbyList);
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
                    <FavoriteButton isFavorite={offer.isFavorite} id={offer.id} isOfferPage/>
                  </div>
                  <RatingStars rating={offer.rating} classTitle="property"/>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {offer.type}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {offer.bedrooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {offer.maxAdults} adults
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
                      <div className={`property__avatar-wrapper ${offer.host.isPro && 'property__avatar-wrapper--pro'} user__avatar-wrapper`}>
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
                  <ReviewsList reviewsList={sortedReviewsList.length > REVIEWS_LIMIT_COUNT
                    ? sortedReviewsList.slice(0,REVIEWS_LIMIT_COUNT)
                    : sortedReviewsList}
                  />
                </div>
              </div>
              <section className="property__map map">
                <Map centerCoordinate={centerCoordinate} coordinatesList={coordinatesList} selectedLocation={offer.location} mapHeight={MAP_HEIGHT}/>
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <PlaceCardsList cardsList={nearbyOffersList}/>
              </section>
            </div>
          </main>
        </div>
  );
};

export default Room;
