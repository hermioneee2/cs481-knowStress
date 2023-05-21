import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../styles/Theme";
import { DownOutlined, EnvironmentFilled } from "@ant-design/icons";
import { Slider, Collapse, theme as antdTheme } from "antd";
import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";

import StressCodeBoxPlot from "../dashboardMinor/StressCodeBoxPlot";
import BoxPlot from "../dashboardMinor/BoxPlot";
import dotenv from "dotenv";

// For sliders
const age_marks = {
  15: "15",
  26: "me",
  75: "75",
};

const app_usage_marks = {
  100: "Least Usage",
  26: "me",
  1: "Most Usage",
};

const moved_distance_marks = {
  100: "Least Active",
  26: "me",
  1: "Most Active",
};

const applyCommonMarkStyle = (marks) => {
  for (const key in marks) {
    if (Object.prototype.hasOwnProperty.call(marks, key)) {
      marks[key] = {
        style: commonMarkStyle,
        label: marks[key],
      };
    }
  }
};

const formatter = (value) => {
  return `Top ${value}%`;
};

// // TODO: Scale this value
// const locationRadiusFormatter = (value) => {
//   return `Top ${value}%`;
// };

// textbox
const { Panel } = Collapse;

//map
const mapContainerStyle = {
  width: "300px",
  height: "300px",
  marginLeft: "100px",
};

// const API_KEY = "";
dotenv.config();

const Dashboard4 = () => {
  //sliders: input values
  const [ageRange, setAgeRange] = useState([15, 75]);
  const [appUsageRange, setAppUsageRange] = useState([1, 100]);
  const [movedDistanceRange, setMovedDistanceRange] = useState([1, 100]);
  const [location, setLocation] = useState({
    lat: 36.370053712983704,
    lng: 127.3605726960359,
  });
  const [locationRadius, setLocationRadius] = useState(120);

  const [myValue, setMyValue] = useState(4.3);

  const [numOfPeople, setNumOfPeople] = useState(77);
  const [topValue, setTopValue] = useState(20);
  const [lowerQuartile, setLowerQuartile] = useState(2.3);
  const [median, setMedian] = useState(3.8);
  const [upperQuartile, setUpperQuartile] = useState(4);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(5.8);

  //map
  const mapRef = useRef(null);
  const [address, setAddress] = useState("대한민국 대전광역시 한국과학기술원");

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5000/map_api_key")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMyValue(outputMyValue);
  //       setNumOfPeople(outputNumOfPeople);
  //       setTopValue(outputTopValue);
  //       setLowerQuartile(outputLowerQuartile);
  //       setMedian(outputMedian);
  //       setUpperQuartile(outputUpperQuartile);
  //       setMin(outputMin);
  //       setMax(outputMax);
  //     });
  // }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const getAddress = async (lat, lng) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_MAP_API_KEY}`
    );
    const data = await response.json();
    return data.results[0].formatted_address;
  };

  const onAfterChangeSlider = (value, sliderName) => {
    switch (sliderName) {
      case "age":
        setAgeRange(value);
        getBoxPlotData(
          value,
          appUsageRange,
          movedDistanceRange,
          location,
          locationRadius
        );
        break;
      case "appUsage":
        setAppUsageRange(value);
        getBoxPlotData(
          ageRange,
          value,
          movedDistanceRange,
          location,
          locationRadius
        );
        break;
      case "movedDistance":
        setMovedDistanceRange(value);
        getBoxPlotData(
          ageRange,
          appUsageRange,
          value,
          location,
          locationRadius
        );
        break;
      case "locationRadius":
        setLocationRadius(value);
        getBoxPlotData(
          ageRange,
          appUsageRange,
          movedDistanceRange,
          location,
          value
        );
        break;
      default:
        break;
    }
  };

  const getBoxPlotData = (
    ageRange,
    appUsageRange,
    movedDistanceRange,
    location,
    locationRadius
  ) => {
    //get data...
    const outputMyValue = 4.3;
    const outputNumOfPeople = 60;
    const outputTopValue = 19;
    const outputLowerQuartile = 2.3;
    const outputMedian = 3.3;
    const outputUpperQuartile = 4.4;
    const outputMin = 0;
    const outputMax = 6;

    setMyValue(outputMyValue);
    setNumOfPeople(outputNumOfPeople);
    setTopValue(outputTopValue);
    setLowerQuartile(outputLowerQuartile);
    setMedian(outputMedian);
    setUpperQuartile(outputUpperQuartile);
    setMin(outputMin);
    setMax(outputMax);
  };

  //map
  const onDragEnd = useCallback(async (event) => {
    const center = mapRef.current.getCenter();

    setLocation({
      lat: center.lat(),
      lng: center.lng(),
    });

    setAddress(await getAddress(center.lat(), center.lng()));
  }, []);

  const [overlayLoaded, setOverlayLoaded] = useState(false);

  const onOverlayLoad = () => {
    setOverlayLoaded(true);
  };

  const locationRangeCircleStyle = {
    position: "absolute",
    width: locationRadius * 2,
    height: locationRadius * 2,
    backgroundColor: theme.colors.selectionTransparent,
    borderRadius: "50%",
    textAlign: "center",
    color: theme.colors.selectionBlue,
    fontWeight: "bold",
    fontSize: 16,
    padding: 4,
    border: `2px solid ${theme.colors.selectionBlue}`,
    marginLeft: `-${locationRadius}px`,
    marginTop: `-${locationRadius}px`,
  };

  const LocationRangeCircle = () => {
    const ref = useRef(null);
    return (
      <OverlayView
        position={location}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        onLoad={onOverlayLoad}
      >
        {overlayLoaded && (
          <div style={locationRangeCircleStyle} ref={ref}></div>
        )}
      </OverlayView>
    );
  };

  const locationIconStyle = {
    position: "absolute",
    fontSize: "36px",
    color: theme.colors.selectionBlue,
    marginLeft: `-18px`,
    marginTop: `-36px`,
  };

  const LocationPin = () => {
    return (
      <OverlayView
        position={location}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        onLoad={onOverlayLoad}
      >
        {overlayLoaded && <EnvironmentFilled style={locationIconStyle} />}
      </OverlayView>
    );
  };

  // text
  const { token } = antdTheme.useToken();
  const panelStyle = {
    marginBottom: 15,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
    fontFamily: "Open Sans",
    fontSize: "12px",
  };

  const PeoplRangeExplanation = (
    <>
      Among{" "}
      <span
        style={{
          fontWeight: 700,
          color: theme.colors.selectionBlue,
        }}
      >
        {numOfPeople}
      </span>{" "}
      people in the group
    </>
  );

  const boxplotExplanation1 = (
    <>
      <span style={{ color: theme.colors.stress3 }}>
        My average stress level of {myValue} ranked in top {topValue}% among{" "}
        {numOfPeople} people in the group.
      </span>{" "}
      Top 1% indicates the most stressed and top 100% indicates the least
      stressed in the group. The closer your ranking is to top 1%, the more
      stressed you are compared to the group.
    </>
  );

  const boxplotExplanation2 = (
    <>
      From top to bottom, each horizontal line indicates:
      <ul style={{ listStyleType: "disc", marginLeft: "-15px" }}>
        <li>100th percentiles: Maximum </li>
        <li>75th percentiles: Third quartile (Q3)</li>
        <li>50th percentiles: Median (Q2)</li>
        <li>25th percentiles: First quartile (Q1)</li>
        <li>0th percentiles: Minimum</li>
      </ul>
      This means that Q1 represents the value below which 25% of the data falls,
      Q2 represents the value below which 50% of the data falls, etc. The box
      represents the middle 50% of the data, between the first quartile (Q1) and
      the third quartile (Q3).
    </>
  );

  const MyRankingTextWrapper = styled.div`
    display: flex;
    z-index: 1;
    position: absolute;
    margin-left: 205px;
    // margin-top: -25px;
    // margin-top: 184px;
    margin-top: ${((myValue * (184 + 25)) / 6) * -1 + 184}px;
  `;

  return (
    <ContentLayout>
      <SliderLayout>
        <StepWrapper>
          <StepHeader>Step 1</StepHeader>
          <StepTitle>Select Interest Group</StepTitle>
        </StepWrapper>
        <SliderWrapper>
          <SliderHeader>Age</SliderHeader>
          <Slider
            range
            marks={age_marks}
            min={15}
            max={75}
            defaultValue={[15, 75]}
            style={{ width: "200px" }}
            onAfterChange={(value) => onAfterChangeSlider(value, "age")}
          />
        </SliderWrapper>
        <SliderWrapper>
          <SliderHeader>App Usage</SliderHeader>
          <Slider
            range
            marks={app_usage_marks}
            min={1}
            max={100}
            defaultValue={[1, 100]}
            tooltip={{ formatter }}
            reverse={true}
            style={{ width: "200px" }}
            onAfterChange={(value) => onAfterChangeSlider(value, "appUsage")}
          />
        </SliderWrapper>
        <SliderWrapper>
          <SliderHeader>Moved Distance</SliderHeader>
          <Slider
            range
            marks={moved_distance_marks}
            min={1}
            max={100}
            defaultValue={[1, 100]}
            tooltip={{ formatter }}
            reverse={true}
            style={{ width: "200px" }}
            onAfterChange={(value) =>
              onAfterChangeSlider(value, "movedDistance")
            }
          />
        </SliderWrapper>
        <SliderWrapper>
          <LocationHeader>Location near</LocationHeader>
          <AddressWrapper>{address}</AddressWrapper>
        </SliderWrapper>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location}
            zoom={14}
            onLoad={onMapLoad}
            onDragEnd={onDragEnd}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            <LocationPin />
            <LocationRangeCircle />
          </GoogleMap>
        ) : (
          <div>Loading...</div>
        )}
        <SliderWrapper>
          <LocationHeader></LocationHeader>
          <RadiusText>Radius</RadiusText>
          <Slider
            min={20}
            max={140}
            defaultValue={locationRadius}
            // tooltip={{ locationRadiusFormatter }}
            tooltip={{ formatter: null }}
            style={{ width: "180px" }}
            onAfterChange={(value) =>
              onAfterChangeSlider(value, "locationRadius")
            }
          />
        </SliderWrapper>
      </SliderLayout>
      <BoxplotLayout>
        <StepWrapper>
          <StepHeader>Step 2</StepHeader>
          <StepTitle>View My Rank</StepTitle>
        </StepWrapper>
        <p
          style={{
            margin: "10 0",
            fontFamily: "Open Sans",
            fontSize: "15px",
            fontWeight: 300,

            color: theme.colors.grayKS,
          }}
        >
          {PeoplRangeExplanation}
        </p>
        <BoxplotWrapper>
          <BoxplotGraph>
            <div style={{ marginTop: 0 }}>
              <StressYAxis />
              <div
                style={{
                  display: "block",
                  zIndex: 3,
                  position: "absolute",
                  marginTop: 5,
                }}
              >
                <StressCodeBoxPlot
                  color={theme.colors.stress6}
                  t={6}
                  lev={"Very Stressed"}
                />
                <StressCodeBoxPlot color={theme.colors.stress5} t={5} />
                <StressCodeBoxPlot color={theme.colors.stress4} t={4} />
                <StressCodeBoxPlot color={theme.colors.stress3} t={3} />
                <StressCodeBoxPlot color={theme.colors.stress2} t={2} />
                <StressCodeBoxPlot color={theme.colors.stress1} t={1} />
                <StressCodeBoxPlot
                  color={theme.colors.stress0}
                  t={0}
                  lev={"Not Stressed"}
                />
              </div>
            </div>
            <div style={{ marginTop: 12, marginLeft: 75, width: 150 }}>
              <BoxPlot
                lowerQuartile={lowerQuartile}
                median={median}
                upperQuartile={upperQuartile}
                min={min}
                max={max}
                myValue={myValue}
              />
            </div>
          </BoxplotGraph>
          <MyRankingTextWrapper>
            <MyRankingTextLeft>{myValue}</MyRankingTextLeft>
            <MyRankingTextRight>
              <MyRankingTitle>My Stress Ranking</MyRankingTitle>
              <TopNPercent>Top {topValue}%</TopNPercent>
            </MyRankingTextRight>
          </MyRankingTextWrapper>
        </BoxplotWrapper>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}
          expandIconPosition="end"
          style={{
            background: token.colorBgContainer,
            marginTop: 50,
            width: "400px",
          }}
        >
          <Panel header="My Stress Ranking" key="1" style={panelStyle}>
            <p
              style={{
                margin: 0,
                fontFamily: "Open Sans",
                color: theme.colors.grayKS,
              }}
            >
              {boxplotExplanation1}
            </p>
          </Panel>
          <Panel header="How to Read Box Plot" key="2" style={panelStyle}>
            <p
              style={{
                margin: 0,
                fontFamily: "Open Sans",
                color: theme.colors.grayKS,
              }}
            >
              {boxplotExplanation2}
            </p>
          </Panel>
        </Collapse>
      </BoxplotLayout>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
`;

const SliderLayout = styled.div``;

const BoxplotLayout = styled.div`
  margin-left: 60px;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StepHeader = styled.div`
  width: 67px;
  height: 29px;
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 400;
  margin-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 13px;
  padding-right: 13px;
  border-radius: 15px;
  color: ${(props) => props.theme.colors.grayKS};
  background-color: ${(props) => props.theme.colors.selectedSidebarKS};
`;

const StepTitle = styled.div`
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grayKS};
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px
  padding-top: 10px;
  margin-left: 10px;
`;

const SliderHeader = styled.div`
  width: 100px;
  font-family: "Open Sans";
  font-size: 13px;
  font-weight: 300;
  margin-right: 40px;
  padding-bottom: 15px;
  color: ${(props) => props.theme.colors.grayKS};
`;

const LocationHeader = styled.div`
  width: 90px;
  font-family: "Open Sans";
  font-size: 13px;
  font-weight: 300;
  margin-right: 10px;
  padding-bottom: 15px;
  color: ${(props) => props.theme.colors.grayKS};
`;

const RadiusText = styled.div`
  font-family: "Open Sans";
  font-size: 11px;
  font-weight: 500;
  margin-right: 10px;
  color: ${(props) => props.theme.colors.selectionBlue};
`;

const commonMarkStyle = {
  color: "#7B7B7B",
  fontFamily: "Open Sans",
  fontSize: "8px",
  fontWeight: "300",
  marginTop: "5px",
  width: "60px",
};

applyCommonMarkStyle(age_marks);
applyCommonMarkStyle(app_usage_marks);
applyCommonMarkStyle(moved_distance_marks);

const AddressWrapper = styled.div`
  // margin-top: -10px;
  font-family: "Open Sans";
  font-size: 12px;
  font-weight: 400;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 13px;
  padding-right: 13px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.selectionBlue};
  background-color: ${(props) => props.theme.colors.selectionTransparent};
`;

const StressYAxis = styled.div`
  height: 219px;
  width: 2px;
  background: linear-gradient(
    ${(props) => props.theme.colors.stress5},
    ${(props) => props.theme.colors.stress2},
    ${(props) => props.theme.colors.stress0}
  );
  z-index: 2;
  position: absolute;
  margin-top: 8px;
  margin-left: 76px;
`;

const BoxplotWrapper = styled.div`
  display: flex;
`;

const BoxplotGraph = styled.div`
  width: 300px;
`;

const MyRankingTextLeft = styled.div`
  margin-top: 20px;
  margin-right: 8px;
  font-family: "Open Sans";
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.me};
`;

const MyRankingTextRight = styled.div`
  display: block;
`;

const MyRankingTitle = styled.div`
  font-family: "Open Sans";
  font-size: 10px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grayKS};
`;

const TopNPercent = styled.div`
  font-family: "Open Sans";
  font-size: 23px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.me};
`;

export default Dashboard4;
