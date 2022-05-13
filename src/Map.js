import React, { useState, useRef } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSupercluster from "use-supercluster";
import "./Map.css";
import * as Data from "./data/airbnbdublingeo.json"

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 53.346,
    longitude: -6.254,
    width: "100vw",
    height: "100vh",
    zoom: 12
  });
  const mapRef = useRef();


  const points = Data.features.map(data => ({
    type: "Feature",
        properties: {
        cluster: false,
        dataId: data.id,
        dataNeighbourhood: data.Neighbourhood,
        dataCity: data.City,
        dataState: data.State,
        dataPropertyType: data.PropertyType,
        dataBathrooms: data.Bathrooms,
        dataBedrooms: data.Bedrooms,
        dataPrice: data.Price
      },
        geometry: {
          type: "Point",
          coordinates:  [ parseFloat(data.geometry.coordinates[0]), parseFloat(data.geometry.coordinates[1]) ] }
  }));

  const {clusters, supercluster} = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds: [-6.543618876090989, 53.222563956123736, -6.029960581107389, 53.63696060258761],
    options: {radius: 75, maxZoom: 20}
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        maxZoom={20}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={newViewport => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
      >
        {clusters.map(cluster => {

          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster : isCluster, point_count: pointCount} = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2
                      }),
                      transitionDuration: "auto"
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }
         
          return ( <Marker
            key={cluster.properties.dataId}
            latitude={latitude}
            longitude={longitude}
          >
            <button className="crime-marker">
              <img src="/house.svg" alt="Properties location" />
            </button>
          </Marker>
          );  
      })}
      </ReactMapGL>
    </div>
  );
}