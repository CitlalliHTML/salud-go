import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const Routing = ({ userPos, clinicaPos }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !userPos || !clinicaPos) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userPos[0], userPos[1]), // Origen (Usuario)
        L.latLng(clinicaPos[0], clinicaPos[1]) // Destino (Clínica)
      ],
      lineOptions: {
        styles: [{ color: "#3b82f6", weight: 5 }] // Color azul de Tailwind
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false // Oculta el panel de texto con instrucciones
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, userPos, clinicaPos]);

  return null;
};