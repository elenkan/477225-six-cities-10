import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AppRouteList} from './enums';
import Main from '../pages/main';
import Login from '../pages/login';
import Favorites from '../pages/favorites';
import Room from '../pages/room';
import NotFoundPage from '../pages/not-found-page';
import PrivateRoute from './private-route/';
import {useAppSelector} from '../hooks/stateHooks';

const AppRouter = () => {
  const authorizationStatus = useAppSelector(state => state.authorizationStatus) || !!localStorage.getItem('six-cities-token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRouteList.Main} element={<Main/>}/>
        <Route path={AppRouteList.Login} element={<Login isAuth={authorizationStatus}/>}/>
        <Route path={AppRouteList.Favorites} element={<PrivateRoute isAuth={authorizationStatus}><Favorites/></PrivateRoute>}/>
        <Route path={AppRouteList.Room} element={<Room/>}/>
        <Route path={AppRouteList.NotFoundPage} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>);
};

export default AppRouter;
