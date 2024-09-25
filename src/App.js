import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { Provider } from 'react-redux';
import store from './store';
// import Teacher from './components/Teacher';
// import Student from './components/Student';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
