import React from "react";
import { SideMenu } from './SideMenu';
import { Header, Sidebar } from "semantic-ui-react";

function About() {
  return (
    <div>
      <SideMenu activeItem="about" />
      <Sidebar.Pusher>
        <Header>About</Header>
      </Sidebar.Pusher>
    </div>
  );
}

export {About};
