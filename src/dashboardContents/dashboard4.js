import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../styles/Theme";
import { DownOutlined, EnvironmentFilled } from "@ant-design/icons";
import { Slider, Collapse, theme as antdTheme, Space, Tooltip } from "antd";
import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";

import BoxPlot from "../dashboardMinor/BoxPlot";
import dotenv from "dotenv";
import CustomYAxis from "../dashboardMinor/customYAxis";

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

// textbox
const { Panel } = Collapse;

//map
const mapContainerStyle = {
  width: "270px",
  height: "270px",
  marginLeft: "110px",
};

dotenv.config();

const Dashboard4 = () => {
  //sliders: input values
  const [ageRange, setAgeRange] = useState([15, 50]);
  const [appUsageRange, setAppUsageRange] = useState([1, 100]);
  const [movedDistanceRange, setMovedDistanceRange] = useState([1, 100]);
  const [location, setLocation] = useState({
    lat: 36.370053712983704,
    lng: 127.3605726960359,
  });
  const [locationRadius, setLocationRadius] = useState(130);
  const [myValue, setMyValue] = useState(3.41);
  const [numOfPeople, setNumOfPeople] = useState(29);
  const [topValue, setTopValue] = useState(34.5);
  const [lowerQuartile, setLowerQuartile] = useState(1.92);
  const [median, setMedian] = useState(2.91);
  const [upperQuartile, setUpperQuartile] = useState(3.635);
  const [min, setMin] = useState(1.05);
  const [max, setMax] = useState(4.19);
  const [myAge, setMyAge] = useState(27);
  const [myApp, setMyApp] = useState(79);
  const [myMovement, setMyMovement] = useState(82);

  //map
  const mapRef = useRef(null);
  const [address, setAddress] = useState(
    "대한민국 대전광역시 한국과학기술원본관"
  );
  const [zoomLevel, setZoomLevel] = useState(14);

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

  const convertPixToKm = (pix) => {
    return (pix / 130) * 2 ** (14 - zoomLevel);
  };

  const locationRadiusFormatter = (value) => {
    const formattedValue = convertPixToKm(value).toFixed(2);
    return `${formattedValue}km`;
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

  const objToQueryString = (obj) => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
      );
    }
    return keyValuePairs.join("&");
  };

  // initialize box plot
  const queryString = objToQueryString({
    min_age: ageRange[0],
    max_age: ageRange[1],
    min_movement: movedDistanceRange[0],
    max_movement: movedDistanceRange[1],
    min_apptime: appUsageRange[0],
    max_apptime: appUsageRange[1],
    lat: location.lat,
    lon: location.lng,
    rad: convertPixToKm(locationRadius), // TODO: need conversion
  });

  useEffect(() => {
    fetch(`https://riyuna.pythonanywhere.com/user?${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        setMyValue(data.my_stress);
        setNumOfPeople(data.total_number);
        setTopValue(data.top_value);
        setLowerQuartile(data.Q1);
        setMedian(data.median);
        setUpperQuartile(data.Q3);
        setMin(data.min);
        setMax(data.max);
        // setMyAge(data.my_age);
        // setMyApp(data.my_apptime * 100);
        // setMyMovement(data.my_activity * 100);
      });
  }, []);

  // For sliders
  const age_marks = {
    15: "15",
    [myAge]: "me",
    50: "50",
  };

  const app_usage_marks = {
    100: "Least Usage",
    [myApp]: "me",
    1: "Most Usage",
  };

  const moved_distance_marks = {
    100: "Least Active",
    [myMovement]: "me",
    1: "Most Active",
  };

  applyCommonMarkStyle(age_marks);
  applyCommonMarkStyle(app_usage_marks);
  applyCommonMarkStyle(moved_distance_marks);

  const getBoxPlotData = (
    ageRangeB,
    appUsageRangeB,
    movedDistanceRangeB,
    locationB,
    locationRadiusB
  ) => {
    //get data...
    const queryString = objToQueryString({
      min_age: ageRangeB[0],
      max_age: ageRangeB[1],
      min_movement: movedDistanceRangeB[0],
      max_movement: movedDistanceRangeB[1],
      min_apptime: appUsageRangeB[0],
      max_apptime: appUsageRangeB[1],
      lat: locationB.lat,
      lon: locationB.lng,
      rad: convertPixToKm(locationRadiusB), // TODO: need conversion
    });

    fetch(`https://riyuna.pythonanywhere.com/user?${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        setMyValue(data.my_stress);
        setNumOfPeople(data.total_number);
        setTopValue(data.top_value);
        setLowerQuartile(data.Q1);
        setMedian(data.median);
        setUpperQuartile(data.Q3);
        setMin(data.min);
        setMax(data.max);
      });
  };

  //map
  const onDragEnd = async () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const lat = center.lat();
      const lng = center.lng();
      setLocation({
        lat: lat,
        lng: lng,
      });

      setAddress(await getAddress(lat, lng));

      getBoxPlotData(
        ageRange,
        appUsageRange,
        movedDistanceRange,
        {
          lat: lat,
          lng: lng,
        },
        locationRadius
      );
    }
  };

  const [overlayLoaded, setOverlayLoaded] = useState(false);

  const onOverlayLoad = () => {
    setOverlayLoaded(true);
  };

  const handleZoomChange = () => {
    if (mapRef.current) {
      const newZoomLevel = mapRef.current.zoom;
      setZoomLevel(newZoomLevel);
      getBoxPlotData(
        ageRange,
        appUsageRange,
        movedDistanceRange,
        location,
        locationRadius
      );
    }
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
      Compared to{" "}
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
        My average stress level of {myValue} ranked in top {topValue}% compared
        to {numOfPeople} people in the group.
      </span>{" "}
      Top 1% indicates the most stressed in the group, so the closer your
      ranking is to top 1%, the more stressed you are compared to the group.
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
            max={50}
            defaultValue={[15, 50]}
            style={{ width: "210px" }}
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
            style={{ width: "210px" }}
            onAfterChange={(value) => onAfterChangeSlider(value, "appUsage")}
          />
        </SliderWrapper>
        <SliderWrapper>
          <SliderHeader>Movement</SliderHeader>
          <Slider
            range
            marks={moved_distance_marks}
            min={1}
            max={100}
            defaultValue={[1, 100]}
            tooltip={{ formatter }}
            reverse={true}
            style={{ width: "210px" }}
            onAfterChange={(value) =>
              onAfterChangeSlider(value, "movedDistance")
            }
          />
        </SliderWrapper>
        <SliderWrapper>
          <LocationHeader>Location near</LocationHeader>
          <Space wrap>
            <Tooltip
              title="Change the address by panning the map"
              placement="bottomLeft"
              color={"#108ee9"}
              key={"#108ee9"}
              overlayInnerStyle={{ width: "270px" }}
            >
              <AddressWrapper>{address}</AddressWrapper>
            </Tooltip>
          </Space>
        </SliderWrapper>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location}
            zoom={zoomLevel}
            onLoad={onMapLoad}
            onDragEnd={onDragEnd}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
            onZoomChanged={handleZoomChange} // Add this event handler
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
            tooltip={{ formatter: locationRadiusFormatter }}
            // tooltip={{ formatter: null }}
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
            <div
              style={{
                height: "306px",
                width: "306px",
                zIndex: 5,
                position: "absolute",
                marginTop: "-37px",
              }}
            >
              <CustomYAxis />
            </div>
            <div
              style={{
                marginTop: 12,
                marginLeft: 75,
                width: 150,
                zIndex: 0,
              }}
            >
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
  margin-left: 100px;
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
  margin-bottom: 10px;
  margin-left: 10px;
`;

const SliderHeader = styled.div`
  width: 80px;
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
  padding-top: 10px;
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
  max-width: 280px;
  margin-top: 10px;
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
