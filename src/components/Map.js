import React, { Component } from "react";
import H from "@here/maps-api-for-javascript";


export default class HereMap extends Component{

    constructor(props)
    {
        super(props);

        this.ref = React.createRef();
        this.map = null;

        this.state = {
            apikey : props.apikey,
            center: {
                lat: props.lat,
                lng: props.lng,
            },
            zoom: props.zoom,
            theme: props.theme,
        }

        this.locationListener = this.locationListener.bind(this)
    }

    

    componentDidMount()
    {

        if(!this.map)
        {
            const platform = new H.service.Platform({
                'apikey' : this.state.apikey
            });
    
            const layer = platform.createDefaultLayers();
    
            this.map = new H.Map(this.ref.current, 
                layer.vector.normal.map, 
                {
                center: {
                    lat : this.state.center.lat,
                    lng : this.state.center.lng
                },
                zoom: this.state.zoom,
                pixelRatio: window.devicePixelRatio || 1
              });
    
              window.addEventListener('resize', () => this.map.getViewPort().resize());
              var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
              var ui = H.ui.UI.createDefault(this.map, layer);
        }
        

          this.locationListener();

    }

      locationListener()
    {
        if(navigator.geolocation) 
        {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position.coords);
            
                this.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
                this.map.setZoom(this.state.zoom);
                var currLoc = new H.map.Marker({lat: position.coords.latitude, lng: position.coords.longitude});
                this.map.addObject(currLoc);
                this.setState({
                    center : {
                        lat : position.coords.latitude,
                        lng : position.coords.longitude
                    }
                })
            })
        }
        
        else {
            console.error("Geolocation is not supported by this browser!");
        }

    }




    render()
    {
        console.log(this.state)

        return(
                <div ref={this.ref} style={{height: '800px', background: 'grey' }} />
        );
    }
};
