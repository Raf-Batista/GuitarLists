import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './components/Home';
import About from './components/About'
import Session from './components/Session'
import SellersContainer from './containers/SellersContainer';

function App() {
  return (
    <div>
    <NavBar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/login' component={Session}/>
      </Switch>
      <SellersContainer />
    </div>
  );
}

export default App;
