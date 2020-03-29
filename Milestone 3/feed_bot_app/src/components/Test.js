import React, { useState, useEffect } from "react";
import { SideMenu } from "./SideMenu";
import TopBar from "./TopBar";
import { Header, Divider, Grid, Container } from "semantic-ui-react";
import { ChatBot } from "aws-amplify-react";
function Test() {
  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      <TopBar />
      <Grid columns={2} style={{ height: "100%" }}>
        <Grid.Row>
          <Grid.Column width={3}>
            <SideMenu activeItem="forms" />
          </Grid.Column>
          <Grid.Column width={12} style={{ paddingTop: "3.5rem" }}>
            <Header>Test</Header>
            <Divider />
            <ChatBot
              title="My Bot"
              botName="FeedBot"
              welcomeMessage="Hope you are doing good! Type 'Get Started' to Start"
              // onComplete={this.handleComplete.bind(this)}
              clearOnComplete={true}
              conversationModeOn={false}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export { Test };
