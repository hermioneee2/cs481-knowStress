import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import styled from "styled-components";
import { theme } from "../styles/Theme";


export default function LeftPositionedTimeline() {
  return (
    <Timeline position="left">
      <TimelineItem>
        <TimelineSeparator sx={{height: 1/2}}>
          <TimelineDot height={1/2} width={1/2} sx={{ backgroundColor: theme.colors.stress6, height: 1/2, width:1/2}} />
          <TimelineConnector sx={{height: 1, marginTop: 0, marginBottom:-10, background: 
          'linear-gradient(to bottom, #4F0E08, #7C1D14})'}} />
        </TimelineSeparator>

        <TimelineContent>
            <LevelLabel>Very Stressed  </LevelLabel>
            <NumberLabel>6</NumberLabel>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
            <NumberLabel>5</NumberLabel>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

const NumberLabel = styled.span`
    color: ${(props) => props.theme.colors.blackKS};
    font-size: 10px;
    font-weight: 400;
    padding-bottom: 30px;
    vertical-align: middle;
`;

const LevelLabel = styled.span`
    color: ${(props) => props.theme.colors.blackKS};
    font-size: 10px;
    font-weight: lighter;
    font-style: italic;
    margin-left: 15px;
    padding-bottom: 30px;
    vertical-align: middle;
`;