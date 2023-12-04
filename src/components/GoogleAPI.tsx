import React from "react";
import GoogleMapReact from "google-map-react";
import"../index.css"

const AnyReactComponent: React.FC<{
  lat: number;
  lng: number;
  text: string;
}> = ({ text }) => (
  <div
className="google-text"
  >
    {text}
  </div>
);

export default function GoogleAPI() {
  const defaultProps = {
    center: {
      lat: 43.70887,
      lng: -79.38789,
    },
    zoom: 18,
  };

  return (
    <div className="google-key">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDGDnunGp2c90gdSzCfcRsNCgAy8nYyzcw" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={43.70887} lng={-79.38789} text="SPIYAS" />
      </GoogleMapReact>
    </div>
  );
}
