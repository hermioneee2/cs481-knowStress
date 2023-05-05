import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { useEffect, useRef } from 'react';

const Dashboard3 = () => {
  const mapElement = useRef(null);


  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(36.3721, 127.3604);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      // zoomControlOptions: {
      //   position: naver.maps.Position.TOP_RIGHT,
      // },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);


  return <div ref={mapElement} style={{ minHeight: '400px' }} />;
};

// const ContentContainer = styled(Layout.Content)`
//   background-color: ${(props) => props.theme.colors.mainBgLightGray};
// `;

export default Dashboard3;



