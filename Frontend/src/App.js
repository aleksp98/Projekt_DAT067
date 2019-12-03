import React, { Component } from 'react';
import './App.css';
import './Script/JS';
import ALink from './Layout/ALink';
import Navigation from './Layout/Navigation';
import Section from './Layout/Section';
import Footer from './Layout/Footer';
import Form from './Layout/Form';
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
//import Route from 'react-router-dom/Route';
import {sendHTTP} from './EmailConfirmation'
import { string } from 'prop-types';
//import { Link } from '@material-ui/core';


import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import registeredPage from './Layout/registeredPage';
import loginPage from './Layout/loginPage';

import Cookies from 'js-cookie'

export const getAccessToken = () => Cookies.get('access_token')
export const getRefreshToken = () => Cookies.get('refresh_token')
export const isAuthenticated = () => !!getAccessToken()


class App extends Component {

    state = {
        visible: true
   
    }

    /* Fråga hur man passerar en onclick via en jsx component */

     render() {
        return (


            //Lyckas inte bryta mig ut from promise for att skriva pa skarmen
            //beroende pa responsen fran fetch
            <Router>
                 <Link to= "/">Home</Link>
                 <Switch>
                <Route path="/confirmation/:token" exact strict render={
                 ({match}) => {


                   
                 

                var temp = sendHTTP(match.params.token);
                

                  var result;
          
                var hets = temp.then(function(response) {

                    var that = this;

                    return response.text().then(function(text) {
                    if(text == "true")
                    {
                       alert('Registreringen funkar');
                     
                    }
                    else{
                        alert('Du lyckades inte registreras');
                      
                }
                   
                    });
                  }); 

                  return  <h1>Välkommen till klubben. Om du fick ett fel försök igen senare</h1>;
                   }
                   }/>

              
  

          
           
   
               <Route path = "/registeredPage" exact strict component ={registeredPage}/>
               
               <Route path = "/loginPage" exact strict component ={loginPage}/>
               
               <Route path = "/#" exact strict Component = {App}/>
               
               
               
              
            

            <section>


                {!this.state.visible ? <Form form={this.state.type} /> : null}

                <header className="header">
                    <div className="headerController">
                        <a href="#" value="Register" onClick={() => { this.setState({ visible: !this.state.visible, type: "Register" }); }}>Register</a>
                        <a href="#" value="Login" onClick={() => { this.setState({ visible: !this.state.visible, type: "Login" }); }}>Login</a>
                    </div>


                    <h1>Customer Identity and Access Management</h1>


                    <Navigation />



                </header>

                <Section id="Start" value="Start" />

                <Section id="Translation" value="Translation" />

                <Section id="Upload" value="Upload" />

                <Section id="About" value="About" />


                <Footer />
                
                
                


          
         <Route path="/"/>


            </section>
            </Switch>
            </Router>

        );
    }
}
export default App;
