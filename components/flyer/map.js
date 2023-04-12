import { GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import { useMemo } from 'react';


export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if(!isLoaded) return <div>Loading...</div>

    return <Gmap />
}

function Gmap() {
    const center = useMemo(() => ({ lat: 33.974103, lng: -84.093237}), []);
    return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
        <Marker position={center} />
    </GoogleMap>)
}
