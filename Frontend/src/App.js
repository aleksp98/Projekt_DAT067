import React, { Component } from 'react';
import './App.css';
import './Script/JS';
import ALink from './Layout/ALink';
import Navigation from './Layout/Navigation';
import Section from './Layout/Section';
import Footer from './Layout/Footer';
import Form from './Layout/Form';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
//import Route from 'react-router-dom/Route';
import {sendHTTP} from './EmailConfirmation'
import { string } from 'prop-types';


class App extends Component {

    state = {
        visible: true
    }

    /* Fråga hur man passerar en onclick via en jsx component */






     render() {
        return (





              
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
             
            //Lyckas inte bryta mig ut from promise for att skriva pa skarmen
            //beroende pa responsen fran fetch
            //fixa så att man automatiskt kommer till main route
            <Router>
                <Route path="/confirmation/:token" exact strict render={
                 ({match}) => {

                    alert('sending to mail');
                  var temp = sendHTTP(match.params.token);
                
          
                   temp.then(function(response) {
                    return response.text().then(function(text) {
                    if(text == "true")
                    {
                        //ändra till snackbar
                       alert('Registreringen funkar');
                    }
                    else{
                        //ändra till snackbar
                        alert('Du lyckades inte registreras');
                }
                   
                    });
                  }); 


                  

                   }
                   }/>
            </Router>







                
                
                

          

            </section>
         
        );
    }
}
export default App;
