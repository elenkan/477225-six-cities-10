import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Card} from '../../types';
import PlaceCard from '../place-card';
import classNames from 'classnames';

type PropsType = {
  cardList: Card[]
}

const PlaceCardList = ({cardList}: PropsType) => {
  const [classTitle, setClassTitle] = useState<string>('');
  const location = useLocation();
  const classListTitle = classNames(
    {
      'favorites__places': location.pathname.includes('favorites'),
      'cities__places-list places__list tabs__content': location.pathname === '/',
      'near-places__list places__list': location.pathname.includes('offer')
    }
  );

  const getClassTitle = (path: string) => {
    if (path === '/') {
      setClassTitle('cities');
    }
    if (path.includes('favorites')) {
      setClassTitle('favorites');
    }
    if (path.includes('offer')) {
      setClassTitle('near-places');
    }
    return '';
  };

  useEffect(() => {
    getClassTitle(location.pathname);
  }, [location]);

  return (
    <div className={classListTitle}>
      {cardList.map(item => <PlaceCard cardItem={item}
                                       classTitle={classTitle}
                                       key={item.id}
      />)}
    </div>
  );
};

export default PlaceCardList;
