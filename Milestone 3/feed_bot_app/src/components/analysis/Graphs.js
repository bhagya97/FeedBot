import React from "react";
import { SideMenu } from "../SideMenu";
import { Header, Grid, Segment, Divider, Tab } from "semantic-ui-react";
import BarChartComponent from "./BarChartComponent";
import WordCloudComponent from "./WordCloudComponent";
import { useParams } from "react-router-dom";

function Graphs() {
  let { courseId } = useParams();

  const getPanes = () => {
    return [
      {
        menuItem: "Parameters",
        render: () => (
          <Tab.Pane>
            <BarChartComponent courseId={courseId} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Word Cloud",
        render: () => (
          <Tab.Pane>
            <WordCloudComponent courseId={courseId} />
          </Tab.Pane>
        )
      }
    ];
  };

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={3}>
          <SideMenu activeItem="analysis" />
        </Grid.Column>
        <Grid.Column as={Segment} width={12}>
          <Header>Analysis</Header>
          <Divider />
          <Tab panes={getPanes()} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export { Graphs };
