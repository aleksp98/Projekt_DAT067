import React from 'react';
import {Link} from 'react-router-dom';
import { sendHTTP } from './EmailConfirmation'


export default class ResetPassword extends React.Component  {
    state = {response : false,loading : true}
    
    async componentDidMount() {
          //fixa riktig popup
         //  const value = await sendHTTP(this.props.match.params.token);
         var password = prompt("ENTER YOUR NEW PASSWORD", "textbox's intial text");

         var mail = this.props.match.params.mail;

         let user = {};
        user["email"] = mail;
        user["password"] = password;
         
         const url = 'https://localhost:5001/api/User/ChangePassword/';
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         const requestOptions = {
             method: 'POST',
             headers,
            body: JSON.stringify(user)

         };
        const request = new Request(url, requestOptions);
        const response = await fetch(request);
        const value = await response.json();

        this.setState({response: value})
        this.setState({loading : false})
     
     }

         render() {
       // const value = await sendHTTP(match.params.token);
       
       if(this.state.loading){
        return ( <h1>Loading</h1> );
       }

       else{
    //  alert(this.state.response);
        //fick ingen respons
     if(!this.state.response){
         return (         <section>
            <h1>Ett fel har inträffat försök igen senare</h1>
            <Link to="/">
            <p>Go to startpage</p>
            </Link>
            </section> );
        }

          else{
        return (        <section>
            <h1>Du har byt lösenord försök att logga in</h1>
            <Link to="/">
            <p>Go to startpage</p>
            </Link>
            </section> );
          }
    }
}
}