import React from "react";
import { SideMenu } from "./SideMenu";
import { Header, Sidebar } from "semantic-ui-react";

function Settings() {
  return (
    <div>
      <SideMenu activeItem="settings" />
      <Sidebar.Pusher>
        <Header>Settings</Header>
      </Sidebar.Pusher>
    </div>
  );
}

export { Settings };
