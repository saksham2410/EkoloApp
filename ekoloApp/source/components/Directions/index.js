import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyB_bXhFmnZbLk9qSl3z8-1Np2QxZLbMSsY"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;