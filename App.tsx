import React from 'react';
import Navigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import store from './src/redux/store'; // Adjust path if necessary
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <Toast />
    </Provider>

  );
};
export default App;
