import React, { Component } from 'react';
import './App.css';
import './Script/JS';
import ALink from './Layout/ALink';
import Navigation from './Layout/Navigation';
import Section from './Layout/Section';
import Footer from './Layout/Footer';
import Form from './Layout/Form';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { sendHTTP } from './EmailConfirmation'
import { string } from 'prop-types';
import ImageSlider from './Components/ImageSlider';

import registeredPage from './Layout/registeredPage';
import loginPage from './Layout/loginPage';
import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token')
export const getRefreshToken = () => Cookies.get('refresh_token')
export const getSession = () => Cookies.get("session")
export const isAuthenticated = () => !!getAccessToken()



class App extends Component {

    state = {
        visibleForm: true,
        isAuthenticated: isAuthenticated(),
        session: getSession()
    }

    /* Fråga hur man passerar en onclick via en jsx component */

    render() {
        return (
            //Lyckas inte bryta mig ut from promise for att skriva pa skarmen
            //beroende pa responsen fran fetch
            <Router>
                <Switch>
                    <Route path="/confirmation/:token" exact strict render={
                        ({ match }) => {

                            var temp = sendHTTP(match.params.token);

                            var result;

                            var hets = temp.then(function (response) {

                                var that = this;

                                return response.text().then(function (text) {
                                    if (text == "true") {
                                        alert('Registreringen funkar');

                                    }
                                    else {
                                        alert('Du lyckades inte registreras');

                                    }

                                });
                            });
                            return <h1>Välkommen till klubben. Om du fick ett fel försök igen senare</h1>;
                        }
                    } />

                    <Route path="/registeredPage" exact strict component={registeredPage} />

                    <Route path="/loginPage" exact strict component={loginPage} />

                    <Route path="/#" exact strict Component={App} />

                    <section>

                        {!this.state.visibleForm ? 
                            <Form form={this.state.type}>
                                <a href="#" onClick={() => { this.setState({ visibleForm: !this.state.visibleForm}); }}>X</a> 
                                
                                <p className="linkDesign" onClick={() => { this.setState({ type: "Login"}); }}>click here to login</p>
                            </Form> 
                        : null}

                        <header className="header">
                            <div className="headerController">
                                {this.state.session ? <div> {JSON.parse(this.state.session).username} </div> : null}
                                    <a href="#" value="Register" onClick={() => { this.setState({ visibleForm: !this.state.visibleForm, type: "Register" }); }}>Register</a>
                                {!this.state.isAuthenticated ?
                                    <a href="#" value="Login" onClick={() => { this.setState({ visibleForm: !this.state.visibleForm, type: "Login" }); }}>Login</a> :
                                    <a href="#" value="Logout" onClick={() => { Cookies.remove("session"); Cookies.remove("access_token"); window.location.reload(); }}>Logout</a>
                                }
                            </div>

                            
                            <h1>Customer Identity and Access Management</h1>


                            <Navigation />

                        </header>

                        <Section id="Start" value="Start">
                            <ImageSlider />
                        </Section>

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
