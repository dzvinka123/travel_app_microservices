import JourneyWidget from './Journey-Widget';
import { Wrapper } from "@googlemaps/react-wrapper";

export default function JourneyWrapper({ onClose }) {
  return (
    <div className="journey-popup">
      <Wrapper apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_API} libraries={['marker']}>
        <JourneyWidget onClose={onClose} />
      </Wrapper>
      <button onClick={onClose}>Close</button>
    </div>
  )
}