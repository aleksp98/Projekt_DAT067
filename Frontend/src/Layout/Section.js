import React from 'react';
import Translation from './Translation'


class section extends React.Component {
    render() {
        return (
            <section id={this.props.id}>

                <h3>Hello, welcome to {this.props.value}</h3>
                
                {(() => {if(this.props.value == "Translation") 
                {return <Translation/>}})()}


            </section>


        )
    }
}

export default section;