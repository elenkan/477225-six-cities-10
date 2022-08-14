import {Link, useNavigate} from 'react-router-dom';
import {Card} from '../../types';
import {store} from '../../store';
import {setCardId} from '../../actions/actions';
import classNames from 'classnames';
import {setOfferFavoriteStatus} from '../../actions/api-actions';
import {useState} from 'react';
import {AppRouteList} from '../../router/enums';

type PropsType = {
  cardItem: Card,
  classTitle: string,
  isAuth: boolean
}

const PlaceCard = ({cardItem: {isPremium,previewImage,price,title,type,id, isFavorite, rating}, classTitle, isAuth}: PropsType) => {
  const classFavoritesInfo = classTitle === 'favorites' ? 'favorites__card-info' : '';
  const [isFavoriteCard, setIsFavoriteCard] = useState<boolean>(isFavorite);
  const navigate = useNavigate();
  const ratingStyle = {width: `${Math.round(rating) * 20}%`};
  const setActiveCardId = () => {
    store.dispatch(setCardId(id));
  };
  const clickButtonHandler = () => {
    if (isAuth) {
      store.dispatch(setOfferFavoriteStatus({isFavorite: !isFavorite, id})).then(() => {
        setIsFavoriteCard(!isFavoriteCard);
      });
    } else {
      navigate(AppRouteList.Login);
    }
  };

  return (
    <article className={`${classTitle}__card place-card`} onMouseOver={setActiveCardId} onMouseLeave={() => {store.dispatch(setCardId(null));}}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${classTitle}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className={`${classFavoritesInfo} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={classNames({
            'place-card__bookmark-button': true,
            'button': true,
            'place-card__bookmark-button--active': isFavoriteCard,
          })}
                  type="button"
           onClick={clickButtonHandler}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={ratingStyle}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
