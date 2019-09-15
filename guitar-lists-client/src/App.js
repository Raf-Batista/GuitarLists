import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './components/Home';

function App() {
  return (
    <div>
    <NavBar />
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
