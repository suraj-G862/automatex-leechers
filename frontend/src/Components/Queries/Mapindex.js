import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, Polyline, InfoWindow } from "@react-google-maps/api";

const CustomMap = () => {
  const [sourceLocation] = useState({
    lat: 21.2470102, // Latitude of IIT Bhilai
    lng: 81.318857, // Longitude of IIT Bhilai
  });

  const [destinationLocation] = useState({
    lat: 21.2480102, // Example destination latitude
    lng: 81.319857, // Example destination longitude
  });

  const [route, setRoute] = useState(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false); // Track the API loading status
  const [showSourceInfo, setShowSourceInfo] = useState(false); // InfoWindow state for source
  const [showDestInfo, setShowDestInfo] = useState(false); // InfoWindow state for destination

  // Function to load Google Maps API
  const loadGoogleMapsApi = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC4dCJhc3e8yyJG6ThGtqIQPsRtdK6a0sk&libraries=places,directions`;
    script.async = true;
    script.onload = () => {
      setIsApiLoaded(true); // API is loaded
    };
    script.onerror = () => {
      console.error("Error loading Google Maps API.");
    };
    document.head.appendChild(script);
  };

  // Load Google Maps API script only once
  useEffect(() => {
    if (!isApiLoaded) {
      loadGoogleMapsApi();
    }
  }, [isApiLoaded]);

  // Fetch route once Google Maps is loaded
  useEffect(() => {
    if (isApiLoaded) {
      const google = window.google;
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: sourceLocation,
          destination: destinationLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setRoute(result.routes[0].overview_path);
          } else {
            console.error("Error fetching directions: ", status);
          }
        }
      );
    }
  }, [isApiLoaded]);

  if (!isApiLoaded) {
    return <div>Loading...</div>; // Show loading until the API is loaded
  }

  return (
    <div className="map-container w-full h-[70vh] rounded-lg">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={18}
        center={sourceLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        {/* Marker for Source (IIT Bhilai) */}
        <Marker
          position={sourceLocation}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Custom marker for source
          }}
          onClick={() => setShowSourceInfo(true)}
        />
        {showSourceInfo && (
          <InfoWindow
            position={sourceLocation}
            onCloseClick={() => setShowSourceInfo(false)}
          >
            <div>
              <h4>Source (IIT Bhilai)</h4>
              <p>
                Latitude: {sourceLocation.lat}, Longitude: {sourceLocation.lng}
              </p>
            </div>
          </InfoWindow>
        )}

        {/* Marker for Destination */}
        <Marker
          position={destinationLocation}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Custom marker for destination
          }}
          onClick={() => setShowDestInfo(true)}
        />
        {showDestInfo && (
          <InfoWindow
            position={destinationLocation}
            onCloseClick={() => setShowDestInfo(false)}
          >
            <div>
              <h4>Destination</h4>
              <p>
                Latitude: {destinationLocation.lat}, Longitude: {destinationLocation.lng}
              </p>
            </div>
          </InfoWindow>
        )}

        {/* Render route if it exists */}
        {route && (
          <Polyline
            path={route}
            geodesic={true}
            strokeColor="#FF0000"
            strokeOpacity={1.0}
            strokeWeight={2}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default CustomMap;
