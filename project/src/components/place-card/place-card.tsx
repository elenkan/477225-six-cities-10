import {Link} from 'react-router-dom';
import {Card} from '../../types';
import {store} from '../../store';
import {setCardId} from '../../actions/actions';
import RatingStars from '../rating-stars';
import FavoriteButton from '../favorite-button';
import {memo} from 'react';

type PropsType = {
  cardItem: Card,
  classTitle: string
}

const PlaceCard = ({cardItem: {isPremium,previewImage,price,title,type,id, isFavorite, rating}, classTitle}: PropsType) => {
  const classFavoritesInfo = classTitle === 'favorites' ? 'favorites__card-info' : '';
  const setActiveCardId = () => {
    store.dispatch(setCardId(id));
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
          <FavoriteButton isFavorite={isFavorite} id={id} />
        </div>
        <RatingStars rating={rating} classTitle="place-card"/>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default memo(PlaceCard);
