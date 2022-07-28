import {Dispatch,SetStateAction} from 'react';
import {Link} from 'react-router-dom';
import {Card} from '../../types';

type PropsType = {
  cardItem: Card,
  setActiveCardId: Dispatch<SetStateAction<null|number>>,
  classTitle: string
}

const PlaceCard = ({cardItem: {isPremium,image,price,name,type,id }, setActiveCardId, classTitle}: PropsType) => {

  const getActiveCardId = () => setActiveCardId(id);
  const classFavoritesInfo = classTitle === 'favorites' ? 'favorites__card-info' : '';

  return (
    <article className={`${classTitle}__card place-card`} onMouseOver={getActiveCardId}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${classTitle}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={image} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className={`${classFavoritesInfo} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80 %'}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
