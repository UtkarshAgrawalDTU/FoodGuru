import React, { Component } from "react";
import Navbar from './Navbar'
import HereMap from './Map'


class LandingPage extends Component{

    constructor()
    {
        super();
        this.state = {
            theme: 'normal.day',
        }
    }


    render()
    {
        

        return (
            <div>
                <Navbar />
                <HereMap
                    apikey= "UXLkRChcRiPgtuU9dGgOamUae8XHGdOIIhpCIgNaTyk"
                    lat="20"
                    lng="40"
                    zoom="12"
                    theme={this.state.theme}/>
            </div>
            
        );
    }
};

export default LandingPage;