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

class App extends Component {

    state = {
        visible: true
    }

    /* Fråga hur man passerar en onclick via en jsx component */

    render() {
        return (


            <Router>
                 <Switch>
                <Route path="/testing/:token" exact strict render={
                 ({match}) => {
                   sendHTTP(match.params.token);

                     return( <h1>Thank you for verifying</h1>);


                   }
                   }/>

              
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
                
                
                

          

            </section>
            </Switch>
            </Router>

        );
    }
}
export default App;
