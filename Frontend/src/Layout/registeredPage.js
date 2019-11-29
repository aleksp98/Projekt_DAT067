import React from 'react';
import '../App';
import {Link} from 'react-router-dom';

 export default class registeredPage extends React.Component  {
    render() {
    return (
        <section>
        
        <h1>Customer Identity and Access Management</h1>
        
        <h1>You have registered</h1>
        
        
            <p>Please confirm your account with the email we sent you</p>
        
        <Link to ='/#'>
            <a>Go back to home page</a>
        </Link>
        
        </section>
    
        );

    }
}

