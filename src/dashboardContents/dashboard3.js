import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { getColor } from "../dashboardMinor/GetColor";
import styled from "styled-components";
import { Layout } from "antd";
// import csvtojson from 'csvtojson';
// import Papa from 'papaparse';

const Dashboard3 = () => {
  // fetch('/Users/hana/Desktop/카이스트/cs481-knowStress/data_processing/data_processing/1504_stress_by_location.csv')
  // .then((response) => response.text())
  // .then((data) => console.log(data));
  // .then(response => response.text())
  // .then(csv => {
  //   csvtojson({
  //     noheader: false,
  //     output: 'json',
  //     trim: true,
  //   })
  //     .fromString(csv)
  //     .then(jsonString => {
  //       console.log(jsonString);
  //       // Use the JSON string as needed
  //     });
  // });

  // const csvFilePath = '/Users/hana/Desktop/카이스트/cs481-knowStress/data_processing/data_processing/1504_stress_by_location.csv';
  // const json = csvToJson().fromFile(csvFilePath);
  // const jsonString = JSON.stringify(json, null, 2)
  // console.log(jsonString);

  // function csvToArray (csv) {
  //   fetch(csv)
  //   .then(response => response.text())
  //   .then(text => {
  //     const rows = text.trim().split('\n');
  //     const data = rows.map(row => row.split(','));
  //     console.log(data);
  //     return data;
  //   });
  // };
  // const data = csvToArray('../../data_processing/data_processing/1506_stress_by_location.csv');

  const data = [
    [36.3747, 127.3643, 2.8],
    [36.3741, 127.3652, 4.0],
    [36.3739, 127.3597, 2.0],
    [36.3801, 127.3586, 4.0],
    [36.37, 127.363, 3.0],
    [36.3694, 127.3626, 3.0],
    [36.3688, 127.3624, 3.0],
    [36.3673, 127.3583, 2.0],
    [36.3676, 127.3575, 2.0],
    [36.3902, 127.3511, 2.0],
    [36.3769, 127.3632, 5.0],
  ];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const options = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        center={{ lat: 36.3721, lng: 127.3604 }}
        zoom={15}
        options={options}
      >
        {data.map((marker, index) => (
          <MarkerF
            key={index}
            position={{ lat: marker[0], lng: marker[1] }}
            label={{ text: marker[2].toString(), color: "white" }}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: getColor(marker[2]),
              fillOpacity: 1,
              scale: Math.pow(2, 5) / 2,
              strokeColor: getColor(marker[2]),
              strokeWeight: 1,
            }}
          />
        ))}
      </GoogleMap>
      <MapExplanation>
        <div style={{ marginBottom: "10px", fontFamily: "Open Sans" }}>
          Explanation of the Map
        </div>
        <text style={{ fontWeight: "lighter" }}>
          This map shows your average stress level according to the location.
          The number and the color of the circle indicates your stress level in
          the location.
        </text>
      </MapExplanation>
    </div>
  );
};

const MapExplanation = styled(Layout.Content)`
  display: block;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 11px;
  margin-bottom: 15px;
  background-color: 
  color: ${(props) => props.theme.colors.grayKS};
  background: ${(props) => props.theme.colors.explanationBackground};
  margin-top: 10px;
  border-radius: 10px;
`;

export default Dashboard3;
