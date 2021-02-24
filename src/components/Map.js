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

        this.locationListener = this.locationListener.bind(this)
        this.restaurantListener = this.restaurantListener.bind(this)
        this.addMarkerToGroup = this.addMarkerToGroup.bind(this)
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
        
        }
        

          this.locationListener();
          this.restaurantListener();
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


    restaurantListener(){

        var restaurants = [];
        var db = firebase.firestore();

        db.collection("restaurant").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                restaurants.push(doc.data());
            });
                restaurants.forEach((doc) => {
                this.addMarkerToGroup({lat: doc.coords.x_, lng: doc.coords.N_},
                    '<div><h1>' + doc.name + '</h1>' +
                    '</div><div >Rating : ' + String(doc.ratings.overall_rating) + '</div>')
            })
        });

        this.setState({
            restaurants : restaurants,
        })
    }


    addMarkerToGroup(coordinate, html) {
        var marker = new H.map.Marker(coordinate);
        marker.setData(html);
        this.group.addObject(marker);
      }
      



    render()
    {

        return(
                <div ref={this.ref} style={{height: '800px', background: 'grey' }} />
        );
    }
};
