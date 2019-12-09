import React from 'react';
import Translation from './Translation'


class section extends React.Component {
    render() {
        return (
            <section className={this.props.id}>

                <h3>Hello, welcome to {this.props.value}</h3>
                
                {(() => {if(this.props.value == "Translation") 
                {return <Translation/>}})()}

                {this.props.children}

            </section>


        )
    }
}

export default section;