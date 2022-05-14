import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Navbar from '../components/NavBar';
import AboutUs from './AboutUs';
import AllPosts from './AllPosts';
import PostScreen from './PostScreen';
import SeeEmployee from './SeeEmployee';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
    return ( 
        <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route  exact path="/"  component={AllPosts} />
          <Route path="/employee/" component = {PostScreen} />
          <Route path="/seeEmployee/:id" component = {SeeEmployee} />
          <Route path="/aboutus/" component = {AboutUs} />
          {/* <Route path="/register" component={RegisterScreen} />
          <Route path="/products" component={ProductsScreen} /> */}
          
        </Switch>
        </BrowserRouter>

     );
}
 
export default Main;