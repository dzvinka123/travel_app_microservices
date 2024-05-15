import PlacesWrapper from './Places-Wrapper';
import { Wrapper } from "@googlemaps/react-wrapper";

export default function PlacesApiWrapper() {
    return (<Wrapper apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_API} libraries={['places']}><PlacesWrapper /></Wrapper>)
}

