"use client";

import { useEffect, useRef, useState } from "react";

import "./style.css";

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  onChangeLocation: (lat: number, lng: number) => void;
}

const markerIcon =
  "https://yeap-delivery-public.s3.us-east-2.amazonaws.com/image/PIN.png";

let markers: google.maps.Marker[] = [];

export default function MapComponent({
  center,
  zoom,
  onChangeLocation,
}: MapProps) {
  const ref = useRef<HTMLDivElement>();
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        mapId: "dc9514b8155bc253",
        center,
        zoom,
        streetViewControl: false,
      });

      setMap(newMap);

      newMap.addListener("click", (e: { latLng: any }) => {
        hideMarkers();

        const marker = new google.maps.Marker({
          position: e.latLng,
          title: "Sua localização",
          icon: markerIcon,
        });

        markers.push(marker);

        marker.setAnimation(google.maps.Animation.DROP);
        marker.setMap(newMap);
        onChangeLocation(e.latLng.lat(), e.latLng.lng());
      });
    }
  }, [ref, map, center, zoom]);

  function setMapOnAll(map: google.maps.Map | null) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function hideMarkers(): void {
    setMapOnAll(null);
  }

  return <div ref={ref} id="map" className="min-w-fit h-[300px]" />;
}
