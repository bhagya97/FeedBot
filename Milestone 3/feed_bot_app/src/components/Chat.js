import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { API_URL } from "../constants/urls";
import { Widget, addResponseMessage, toggleWidget } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

function Chat() {
  useEffect(() => {
    toggleWidget();
    addResponseMessage("Hi! How are you doing?");
  }, []);

  const sendMessage = (msg) => {
    fetch(API_URL + "/chat", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ answer: msg }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 1) {
          addResponseMessage(responseJson.next_question);
        }
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "320px", alignSelf: "center" }}>
        <Widget
          handleNewUserMessage={sendMessage}
          title="My new awesome title"
          subtitle="And my cool subtitle"
        />
      </div>
    </div>
  );
}

export { Chat };
