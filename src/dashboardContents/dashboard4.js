import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

const Dashboard4 = () => {
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
