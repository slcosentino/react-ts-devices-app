import React from 'react';
import { Provider } from 'react-redux';
import { Container } from './App.styled';
import DevicePage from './components/DevicePage/DevicePage';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <DevicePage></DevicePage>
      </Container>
    </Provider>
  );
};

export default App;
