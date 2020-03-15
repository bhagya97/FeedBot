import React from "react";
import { SideMenu } from './SideMenu';
import { Header, Sidebar } from "semantic-ui-react";

function Analysis() {
  return (
    <div>
      <SideMenu activeItem="analysis" />
      <Sidebar.Pusher>
        <Header>Analysis</Header>
      </Sidebar.Pusher>
    </div>
  );
}

export {Analysis};
