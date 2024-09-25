import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
// import Teacher from './components/Teacher';
// import Student from './components/Student';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
