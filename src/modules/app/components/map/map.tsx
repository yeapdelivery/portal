"use client";

import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "./map-component";

interface MapProps {
  onChangeLocation: (lat: number, lng: number) => void;
}

export default function Map({ onChangeLocation }: MapProps) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS}>
      <MapComponent
        center={{ lat: -14.9068666, lng: -41.9692379 }}
        zoom={15}
        onChangeLocation={onChangeLocation}
      />
    </Wrapper>
  );
}
