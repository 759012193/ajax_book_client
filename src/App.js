import React from 'react';
import {connect} from 'react-redux'
import {HashRouter as Router,Switch,Route}from 'react-router-dom'
import Home from './pages/main/Main'
import Login from './pages/login/Login'
import './App.css'
class App extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    )
  }
}
const mapStateToProps = (state)=>{
  return {
      
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
