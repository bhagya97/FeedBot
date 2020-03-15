import React from "react";
import { Header, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

function SideMenu({ activeItem }) {
  return (
    <Menu fluid vertical inverted>
      <Menu.Item as={Link} to="/" active={activeItem === "forms"}>
        Forms
      </Menu.Item>
      <Menu.Item as={Link} to="/triggers" active={activeItem === "triggers"}>
        Trigger Events
      </Menu.Item>
      <Menu.Item as={Link} to="/analysis" active={activeItem === "analysis"}>
        Analysis
      </Menu.Item>
      <Menu.Item as={Link} to="/about" active={activeItem === "about"}>
        About Us
      </Menu.Item>
      <Menu.Item as={Link} to="/settings" active={activeItem === "settings"}>
        Settings
      </Menu.Item>
      </Menu>
  );
}

export { SideMenu };
