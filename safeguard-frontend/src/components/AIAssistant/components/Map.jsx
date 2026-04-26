import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const Map = ({ userLocation, currentDestination, isNavigating, allSafePlaces, nearestSafePlace, onSafePlaceClick }) => {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const destMarkerRef = useRef(null);
  const routeRef = useRef(null);
  const safePlaceMarkersRef = useRef({}); // store by place name for updates

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([20, 0], 2);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> & CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapRef.current);
    }
  }, []);

  // Clear all safe place markers
  const clearSafePlaceMarkers = () => {
    Object.values(safePlaceMarkersRef.current).forEach(marker => {
      if (mapRef.current) mapRef.current.removeLayer(marker);
    });
    safePlaceMarkersRef.current = {};
  };

  // Display all safe places and highlight the nearest
  useEffect(() => {
    if (!mapRef.current || !allSafePlaces) return;
    clearSafePlaceMarkers();

    allSafePlaces.forEach(place => {
      const distanceKm = (place.distance / 1000).toFixed(2);
      const isNearest = nearestSafePlace && place.name === nearestSafePlace.name;

      // Choose icon based on whether it's the nearest
      const iconHtml = isNearest ? '⭐' : '🏠';
      const iconSize = isNearest ? [28, 28] : [24, 24];
      const marker = L.marker([place.lat, place.lng], {
        icon: L.divIcon({
          html: iconHtml,
          iconSize: iconSize,
          className: isNearest ? 'nearest-marker' : 'safe-marker-all'
        })
      }).addTo(mapRef.current);

      // Tooltip with name and distance
      marker.bindTooltip(`${place.name} (${distanceKm} km)`, { sticky: true, offset: [0, -15] });

      // If it's the nearest, open a popup with distance info
      if (isNearest) {
        marker.bindPopup(`<b>Nearest Safe Place</b><br>${place.name}<br>${Math.round(place.distance)}m away`).openPopup();
      }

      // Click handler
      marker.on('click', () => {
        if (onSafePlaceClick) onSafePlaceClick(place);
      });

      safePlaceMarkersRef.current[place.name] = marker;
    });

    // Adjust map bounds to include all markers and user location
    if (mapRef.current && userLocation) {
      const markers = Object.values(safePlaceMarkersRef.current);
      if (markers.length > 0) {
        const latLngs = markers.map(m => m.getLatLng());
        latLngs.push(L.latLng(userLocation.lat, userLocation.lng));
        const bounds = L.latLngBounds(latLngs);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      } else {
        mapRef.current.setView([userLocation.lat, userLocation.lng], 15);
      }
    }
  }, [allSafePlaces, nearestSafePlace, userLocation, onSafePlaceClick]);

  // Update user marker
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;
    if (userMarkerRef.current) mapRef.current.removeLayer(userMarkerRef.current);
    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
      icon: L.divIcon({ html: '🔵', iconSize: [20, 20], className: 'user-dot' })
    }).addTo(mapRef.current);
    userMarkerRef.current.bindTooltip('You are here').openTooltip();

    // If not navigating, maybe center on user (but bounds already set above)
    if (!isNavigating) {
      // Don't override bounds if we already have markers
    }
  }, [userLocation, isNavigating]);

  // Update destination marker and route
  useEffect(() => {
    if (!mapRef.current || !currentDestination) return;
    if (destMarkerRef.current) mapRef.current.removeLayer(destMarkerRef.current);
    destMarkerRef.current = L.marker([currentDestination.lat, currentDestination.lng], {
      icon: L.divIcon({ html: '📍', iconSize: [28, 28], className: 'safe-marker' })
    }).addTo(mapRef.current);
    destMarkerRef.current.bindTooltip(currentDestination.name).openTooltip();

    if (userLocation && isNavigating) {
      if (routeRef.current) mapRef.current.removeLayer(routeRef.current);
      const latlngs = [[userLocation.lat, userLocation.lng], [currentDestination.lat, currentDestination.lng]];
      routeRef.current = L.polyline(latlngs, { color: '#1976d2', weight: 5, opacity: 0.7, dashArray: '8, 8' }).addTo(mapRef.current);
      mapRef.current.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] });
    } else if (userLocation && !isNavigating && routeRef.current) {
      mapRef.current.removeLayer(routeRef.current);
      routeRef.current = null;
    }
  }, [currentDestination, userLocation, isNavigating]);

  return <div id="map" style={{ height: '320px', width: '100%' }}></div>;
};

export default Map;