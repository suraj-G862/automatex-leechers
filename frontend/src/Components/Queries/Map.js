import React from 'react';
import CustomMap from './Mapindex';
import { APIProvider } from '@vis.gl/react-google-maps';

const Map = () => {
  return (
    <div className="app">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyC4dCJhc3e8yyJG6ThGtqIQPsRtdK6a0sk"}>
        <CustomMap />
      </APIProvider>
    </div>
  );
};

export default Map;
