import { useRef, useState, useEffect } from 'react';
import { GoogleMapsProvider, useGoogleMap } from '@ubilabs/google-maps-react-hooks';

export default function Map() {
    const [mapContainer, setMapContainer] = useState(null);

    const mapOptions = {
        zoom: 12,
        center: {
            lat: 43.68,
            lng: -79.43,
        }
    };
return (
    <GoogleMapsProvider
        googleMapsAPIKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        mapOptions={mapOptions}
        mapContainer={mapContainer}
        >
        <div ref={(node) => setMapContainer(node)} style={{height:"500px", width: "500px"}} />
        <Location />
    </GoogleMapsProvider>
)
}

function Location() {
    const [lat, setLat] = useState(43.68);
    const [lng, setLng] = useState(-79.43);
    const map = useGoogleMap();
    const markerRef = useRef();

    useEffect(() => {
        if(!map || markerRef.current) return;
        markerRef.current = new google.maps.Marker({map});
    }, [map]);
    useEffect(() => {
        if(!markerRef.current) return;
        if(isNaN(lat) || isNaN(lng)) return;
        markerRef.current.setPosition({lat, lng});
        map.panTo({ lat, lng });
    }, [lat, lng]);


    
       function changeOption (event) {
        this.setState({
         location: {
          ...this.state.location,
          state: event.target.value
         }
        })
       }
       function inputChange (event) {
        this.setState({
         location: {
          ...this.state.location,
          [event.target.name]: event.target.value
         }
        })
       }
       function handleSubmit (event) {
        event.preventDefault();
        this.getGeocode(this.state.location)
       }

    const state = { 
        statesArray: [
        "AL", "AZ", "AK", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA",   "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
       "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD",
       "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
        ]
       }
    return (
        <div>
        <div className='lat-lng'>
            <input type='number' value={lat} onChange={(event) => setLat(parseFloat(event.target.value))} step={0.01} />
            <input type='number' value={lng} onChange={(event) => setLng(parseFloat(event.target.value))} step={0.01} />
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="address" onChange={inputChange} />
            <input type="text" name="city" onChange={inputChange} />
            {/* <select id="state" onChange={changeOption} >
            {state}
            </select> */}
            <input type="submit" value="Check Location" />
        </form>
        </div>

        
    )
}
