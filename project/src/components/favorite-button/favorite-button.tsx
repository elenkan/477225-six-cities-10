import classNames from 'classnames';
import {store} from '../../store';
import {setOfferFavoriteStatus} from '../../actions/api-actions';
import {AppRouteList} from '../../router/enums';
import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/stateHooks';

type PropsType = {
  isFavorite: boolean,
  id: number | null
}

const FavoriteButton = ({isFavorite, id}: PropsType) => {
  const [isFavoriteCard, setIsFavoriteCard] = useState<boolean>(isFavorite);
  const navigate = useNavigate();
  const isAuth = useAppSelector(state => state.authorizationStatus);
  const isOfferPage = useLocation().pathname.includes('offer');
  const buttonClass = classNames({
    'place-card__bookmark-button': !isOfferPage,
    'property__bookmark-button': isOfferPage,
    'button': true,
    'place-card__bookmark-button--active': !isOfferPage && isFavoriteCard,
    'property__bookmark-button--active': isOfferPage && isFavoriteCard
  });

  const clickButtonHandler = () => {
    if (isAuth) {
      store.dispatch(setOfferFavoriteStatus({isFavorite: !isFavoriteCard, id})).then(() => {
        setIsFavoriteCard(!isFavoriteCard);
      });
    } else {
      navigate(AppRouteList.Login);
    }
  };

  return (
    <button className={buttonClass}
            type="button"
            onClick={clickButtonHandler}>
      <svg className="place-card__bookmark-icon"
           width={isOfferPage ? '31' : '18'}
           height={isOfferPage ? '33' : '19'}>
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>);
};

export default FavoriteButton;
