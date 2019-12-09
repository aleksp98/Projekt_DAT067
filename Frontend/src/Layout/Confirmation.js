import React from 'react';
import {Link} from 'react-router-dom';
import { sendHTTP } from './EmailConfirmation'


export default class Confirmation extends React.Component  {
    state = {response : false,loading : true}
    
    async componentDidMount() {

           const value = await sendHTTP(this.props.match.params.token);
           this.setState({ response: value})

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
            <h1>Välkommen till klubben. Du är nu registrerad</h1>
            <Link to="/">
            <p>Go to startpage</p>
            </Link>
            </section> );
          }
    }
}
}