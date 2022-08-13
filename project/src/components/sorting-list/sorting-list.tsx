import {SORTING_DATA} from '../../constants';
import {Dispatch, SetStateAction, useState} from 'react';
import classNames from 'classnames';

type PropsType = {
  action: Dispatch<SetStateAction<string>>
}

export const SortingList = ({action}: PropsType) => {
  const [currentType, setCurrentType] = useState<string>('popular');
  const [isOpenList, setIsOpenList] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Popular');

  const listClass = classNames({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': isOpenList
  });

  const clickHandler = (item : {[key: string]: string}) => {
    action(item.value);
    setCurrentType(item.value);
    setTitle(item.title);
    setIsOpenList(false);
  };

  return (
    <div className="places__sorting">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpenList(!isOpenList)}>
        {title}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"/>
          </svg>
      </span>
      <ul className={listClass}>
        {SORTING_DATA.map(item => (
          <li className={classNames({'places__option': true, 'places__option--active': currentType === item.value})}
              tabIndex={0}
              onClick={() => clickHandler(item)}
              key={item.value}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>);
};
