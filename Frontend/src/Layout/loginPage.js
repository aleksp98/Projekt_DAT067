import React from 'react';
import {Link} from 'react-router-dom';

export default class loginPage extends React.Component  {
    render() {
    return (
        <section>
        
        <h1>Customer Identity and Access Management</h1>
        
        <h1>Welcome</h1>
        
        
            <p>go to your profile</p>
        
        <Link to ='/#'>
            <a>Go back to home page</a>
        </Link>
        
        </section>
    
        );

    }
}