import React, { Component } from "react";
import './Loading.css'

export default class Loading extends Component{

    render(){

        return(

            <div class="box">
            <span class="flashing-circle"></span>
            <span class="flashing-circle"></span>
            <span class="flashing-circle"></span>
            </div>
                
        )
    }
}

