import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../styles/Theme";
import { Layout } from "antd";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material";
import CustomBarChart from "../dashboardMinor/customBarChart";

const Dashboard5 = () => {
  const newArray = [];
  const [arrColor, setArrColor] = useState([...newArray]);
  const [activeButton, setActiveButton] = useState("Age");
  const [data, setData] = useState([]);
  const [myX, setMyX] = useState(0);
  const [myY, setMyY] = useState(3.41);
  const buttonStyle = ({ color, buttonId }) => {
    const isActive = buttonId === activeButton;
    return {
      gap: "10px",
      paddingBottom: "4px",
      paddingHorizontal: "8px",

      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      allignItems: "center",
      height: "22px",

      textTransform: "none",
      textAlign: "center",
      color: color,

      fontFamily: "Open Sans",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "10px",
      lineHeight: "14px",

      backgroundColor: isActive ? alpha(color, 0.3) : alpha(color, 0.1),
      boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.1)",
      borderRadius: "7px",

      display: "inline",
      "&:hover": { backgroundColor: alpha(color, 0.3) },
    };
  };

  const buttonStyle2 = ({ color, buttonId }) => {
    const isActive = buttonId === activeButton;
    return {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      allignItems: "center",
      paddingHorizontal: "20px",
      paddingBottom: "10px",
      gap: "10px",

      height: "39px",

      backgroundColor: isActive ? alpha(color, 0.1) : "White",
      boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",

      textTransform: "none",
      textAlign: "center",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "19px",
      color: color,
      fontFamily: "Open Sans",
      "&:hover": { backgroundColor: alpha(color, 0.3) },
    };
  };
  const changeColor = (buttonId) => {
    setActiveButton(buttonId)
  };



  const queryString = (activeButton) => {
    switch (activeButton){
        case "Movement":
            return 'activity'
        case "Sleep Time":
        case "Age":
            return activeButton.toLowerCase();
        case "Total App Usage":
            return 'total_app'
        case "Video/Contents":
            return "video_contents_app";
        default:
            return `${activeButton.toLowerCase()}_app`
    }
  }

  const updateGraph = (activeButton) => {
    if(['Social Media', 'Game', 'Messenger', 'Video/Contents', 'Utility', 'Movement', 'Total App Usage'].includes(activeButton)){
        fetch(`https://riyuna.pythonanywhere.com/histogram?category=${queryString(activeButton)}`)
        .then((response) => response.json())
        .then((dt) =>{
            const newData=[
                { x: 'Top\n1%', y: dt["0%~10%"].stress, range: `${dt["0%~10%"].mintime} ~ ${dt["0%~10%"].maxtime}`, percent: 0, category: `${activeButton}`},
                { x: 'Top\n10%', y: dt["10%~20%"].stress, range: `${dt["10%~20%"].mintime} ~ ${dt["10%~20%"].maxtime}`, percent: 10, category: `${activeButton}`},
                { x: 'Top\n20%', y: dt["20%~30%"].stress, range: `${dt["20%~30%"].mintime} ~ ${dt["20%~30%"].maxtime}`, percent: 20, category: `${activeButton}`},
                { x: 'Top\n30%', y: dt["30%~40%"].stress, range: `${dt["30%~40%"].mintime} ~ ${dt["30%~40%"].maxtime}`, percent: 30, category: `${activeButton}`},
                { x: 'Top\n40%', y: dt["40%~50%"].stress, range: `${dt["40%~50%"].mintime} ~ ${dt["40%~50%"].maxtime}`, percent: 40, category: `${activeButton}`},
                { x: 'Top\n50%', y: dt["50%~60%"].stress, range: `${dt["50%~60%"].mintime} ~ ${dt["50%~60%"].maxtime}`, percent: 50, category: `${activeButton}`},
                { x: 'Top\n60%', y: dt["60%~70%"].stress, range: `${dt["60%~70%"].mintime} ~ ${dt["60%~70%"].maxtime}`, percent: 60, category: `${activeButton}`},
                { x: 'Top\n70%', y: dt["70%~80%"].stress, range: `${dt["70%~80%"].mintime} ~ ${dt["70%~80%"].maxtime}`, percent: 70, category: `${activeButton}`},
                { x: 'Top\n80%', y: dt["80%~90%"].stress, range: `${dt["80%~90%"].mintime} ~ ${dt["80%~90%"].maxtime}`, percent: 80, category: `${activeButton}`},
                { x: 'Top\n90%', y: dt["90%~100%"].stress, range: `${dt["90%~100%"].mintime} ~ ${dt["90%~100%"].maxtime}`, percent: 90, category: `${activeButton}`},
                { x: 'Top\n100%',y: 0}
            ];
            setData(newData);
            setMyX(dt['myX'])
            setMyY(dt['myY'])
        });
    }
    else if(activeButton === 'Age'){
        fetch(`https://riyuna.pythonanywhere.com/histogram?category=${queryString(activeButton)}`)
        .then((response) => response.json())
        .then((dt) =>{
            const newData=[
                { x: "15", y: dt['15~19'], range: "15 ~ 19", category: `${activeButton}`},
                { x: "20", y: dt['20~24'], range: "20 ~ 24", category: `${activeButton}`},
                { x: "25", y: dt['25~29'], range: "25 ~ 29", category: `${activeButton}`},
                { x: "30", y: dt['30~34'], range: "30 ~ 34", category: `${activeButton}`},
                { x: "35", y: dt['35~39'], range: "35 ~ 39", category: `${activeButton}`},
                { x: "40", y: dt['40~44'], range: "40 ~ 44", category: `${activeButton}`},
                { x: "45", y: dt['45~49'], range: "45 ~ 49", category: `${activeButton}`},
                { x: "50", y: 0, range: "50 ~ 54", category: `${activeButton}`},
            ];
            setData(newData);
            setMyX(dt['myX'])
            setMyY(dt['myY'])
        });
    }
    else{setData([])}
}
    useEffect(() => {
        updateGraph(activeButton);
    }, [activeButton]);


  const HistogramExplanation = activeButton ? (
    <>Relationship between Stress Level and {activeButton}</>
  ) : (
    <>Relationship between Stress Level and Age</>
  );
  const BarChartExplanationString = () => {
    switch (activeButton) {
      case "Movement":
        return (
          <>
            This histogram shows average stress level distribution according to
            the movement time.
            <br />
            <br />
            According to histogram, it seems: movement is not really related
            with stress level.
          </>
        );
      case "Sleep Time":
        return (
          <>
            This histogram shows average stress level distribution according to
            the sleep time.
            <br />
            <br />
            According to histogram, it seems:{" "}
            <b>
              too less or much sleeping is related with higher stress level.
            </b>{" "}
            Would you try proper sleep regularly?
          </>
        );
      case "Social Media":
        return (
          <>
            This histogram shows average stress level distribution according to
            the usage time of social media apps.
            <br />
            <br />
            According to histogram, it seems: social media usage time is not
            really related with stress level.
          </>
        );
      case "Game":
        return (
          <>
            This histogram shows average stress level distribution according to
            the game apps.
            <br />
            <br />
            According to histogram, it seems:{" "}
            <b>
              the higher the game playing time, the higher the stress level.
            </b>{" "}
            Would you try reducing the gaming time?
          </>
        );
      case "Messenger":
        return (
          <>
            This histogram shows average stress level distribution according to
            the messenger apps.
            <br />
            <br />
            According to histogram, it seems: messenger usage time is not really
            related with stress level.
          </>
        );
      case "Video/Contents":
        return (
          <>
            This histogram shows average stress level distribution according to
            the video/contents apps.
            <br />
            <br />
            According to histogram, it seems:{" "}
            <b>
              the lower the video/contents using time, the higher the stress
              level.
            </b>{" "}
            Would you try using some video/contents apps to reduce your stress?
          </>
        );
      case "Browser":
        return (
          <>
            This histogram shows average stress level distribution according to
            the browser apps.
            <br />
            <br />
            According to histogram, it seems:{" "}
            <b>
              too less or much browser using is related with higher stress
              level.
            </b>{" "}
            Would you try to use web browsers properly?
          </>
        );
      case "Utility":
        return (
          <>
            This histogram shows average stress level distribution according to
            the browser apps.
            <br />
            <br />
            According to histogram, it seems:{" "}
            <b>
              the higher the utility using time, the higher the stress level.
            </b>{" "}
            Would you try reducing the utility app using time?
          </>
        );
      default:
        return (
          <>
            This histogram shows average stress level distribution according to
            the age.
            <br />
            <br />
            According to histogram, it seems:{" "}
            <b>the higher the age, the higher the stress level.</b>
          </>
        );
    }
  };

  useEffect(() => {
    const updatedList = [...arrColor];
    if (activeButton === null) {
      updatedList.map((item, i) => {
        updatedList[i] = alpha(updatedList[i], 1);
      });
    }
    setArrColor(updatedList);
  }, [activeButton]);

  return (
    <ContentLayout>
      <CategorySelectionLayout>
        <StepWrapper>
          <StepHeader>Step 1</StepHeader>
          <StepTitle>Select Category</StepTitle>
        </StepWrapper>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button
            value={"Age"}
            onClick={() => changeColor("Age")}
            sx={buttonStyle2({ color: theme.colors.blackKS, buttonId: "Age" })}
            variant="text"
          >
            {"Age"}
          </Button>

          <Button
            value={"Movement"}
            onClick={() => changeColor("Movement")}
            sx={buttonStyle2({
              color: theme.colors.blackKS,
              buttonId: "Movement",
            })}
            variant="text"
          >
            {"Movement"}
          </Button>

          <Button
            value={"Sleep Time"}
            onClick={() => changeColor("Sleep Time")}
            sx={buttonStyle2({
              color: theme.colors.blackKS,
              buttonId: "Sleep Time",
            })}
            variant="text"
          >
            {"Sleep Time"}
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "10px",
          }}
        >
          <Button
            value={"Total App Usage"}
            onClick={() => changeColor("Total App Usage")}
            sx={{
              ...buttonStyle2({
                color: theme.colors.blackKS,
                buttonId: "Total App Usage",
              }),
              width: "130px",
            }}
            variant="text"
          >
            {"Total App Usage"}
          </Button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
              gap: "7px",
            }}
          >
            <div style={{ display: "flex" }}>
              <Button
                value={"Social Media"}
                onClick={() => changeColor("Social Media")}
                sx={buttonStyle({
                  color: theme.colors.socialMedia,
                  buttonId: "Social Media",
                })}
                variant="text"
              >
                {"Social Media"}
              </Button>

              <Button
                value={"Game"}
                onClick={() => changeColor("Game")}
                sx={buttonStyle({ color: theme.colors.game, buttonId: "Game" })}
                variant="text"
              >
                {"Game"}
              </Button>

              <Button
                value={"Messenger"}
                onClick={() => changeColor("Messenger")}
                sx={buttonStyle({
                  color: theme.colors.communicationWriting,
                  buttonId: "Messenger",
                })}
                variant="text"
              >
                {"Messenger"}
              </Button>
            </div>
            <div style={{ display: "flex" }}>
              <Button
                value={"Video/Contents"}
                onClick={() => changeColor("Video/Contents")}
                sx={buttonStyle({
                  color: theme.colors.videoStreaming,
                  buttonId: "Video/Contents",
                })}
                variant="text"
              >
                {"Video/Contents"}
              </Button>

              <Button
                value={"Browser"}
                onClick={() => changeColor("Browser")}
                sx={buttonStyle({
                  color: theme.colors.browser,
                  buttonId: "Browser",
                })}
                variant="text"
              >
                {"Browser"}
              </Button>

              <Button
                value={"Utility"}
                onClick={() => changeColor("Utility")}
                sx={buttonStyle({
                  color: theme.colors.utility,
                  buttonId: "Utility",
                })}
                variant="text"
              >
                {"Utility"}
              </Button>
            </div>
          </div>
        </div>
      </CategorySelectionLayout>

      <ResultGraphLayout>
        <StepWrapper>
          <StepHeader>Step 2</StepHeader>
          <StepTitle>View Stress Level Distribution</StepTitle>
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
          {HistogramExplanation}
        </p>
        <div style={{ height: "400px", width: "400px" }}>
          <CustomBarChart category={activeButton} data={data} userX={myX} userY={myY} />
        </div>
        <div style={{ marginBottom: "0px" }}></div>
        <BarChartExplanation>
          <text
            style={{
              marginBottom: "0px",
              fontFamily: "Open Sans",
              fontWeight: "400",
              color: theme.colors.grayKS,
            }}
          >
            {BarChartExplanationString(activeButton)}
          </text>
        </BarChartExplanation>
      </ResultGraphLayout>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
`;

const CategorySelectionLayout = styled.div``;

const ResultGraphLayout = styled.div`
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

const BarChartExplanation = styled(Layout.Content)`
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
  width: 400px;
  border-radius: 10px;
`;

export default Dashboard5;
