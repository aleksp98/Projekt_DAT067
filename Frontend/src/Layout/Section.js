import React from 'react';
import Translation from './Translation';


class section extends React.Component {
    render() {
        return (
            <section className={this.props.id}>

                {this.props.show === "true" ?
                <h3>{this.props.value}</h3>
                : null }

                {(() => {if(this.props.value == "Translation")
                {return <Translation/>}})()}

                {this.props.children}

            </section>


        )
    }
}

export default section;
