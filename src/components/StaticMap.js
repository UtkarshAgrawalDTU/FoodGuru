import React, { Component } from "react";
import H from "@here/maps-api-for-javascript";
import firebase from "firebase/app"


export default class HereMap extends Component{

    constructor(props)
    {
        super(props);

        this.ref = React.createRef();
        this.map = null;
        this.group = null;
        this.ui = null;

        this.state = {
            apikey : props.apikey,
            center: {
                lat: props.lat,
                lng: props.lng,
            },
            zoom: props.zoom,
            theme: props.theme,
            restaurants : [],
        }
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
              this.ui = H.ui.UI.createDefault(this.map, layer);

              this.group = new H.map.Group();
              this.map.addObject(this.group);
      
                this.group.addEventListener('tap', (evt) => {
                var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
                    content: evt.target.getData()
                });

                this.ui.addBubble(bubble);
                }, false);

                var Marker = new H.map.Marker({lat:this.props.lat, lng:this.props.lng});
                this.map.addObject(Marker);
        
        }
    }      


    render()
    {

        return(
                <div ref={this.ref} style={{height: '100%', background: 'grey' }} />
        );
    }
};
