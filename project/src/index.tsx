import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchOfferList, checkAuth} from './actions/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(checkAuth());
store.dispatch(fetchOfferList());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer hideProgressBar/>
    </Provider>
  </React.StrictMode>,
);
