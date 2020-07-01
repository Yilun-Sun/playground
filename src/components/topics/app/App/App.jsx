import React from 'react';
import AppStyle from './AppStyle';
import NavigationBar from '../../../topics/NavigationBar/NavigationBar';

const App = ({ content }) => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <div>{content}</div>
    </div>
  );
};

export default App;
