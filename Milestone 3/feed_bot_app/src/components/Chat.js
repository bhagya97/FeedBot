import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { API_URL } from "../constants/urls";
import { Widget, addResponseMessage, toggleWidget } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

function Chat() {
  const [q_no, setQno] = useState(0);
  useEffect(() => {
    toggleWidget();
    addResponseMessage("How are you doing?");
  }, []);

  const sendMessage = (msg) => {
    fetch(API_URL + "/chat", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ answer: msg, q_no: q_no }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 1) {
          addResponseMessage(responseJson.next_question);
          setQno(q_no + 1);
        }
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "320px", alignSelf: "center" }}>
        <Widget
          handleNewUserMessage={sendMessage}
          title="FeedBot"
          subtitle="Coversational Bot"
        />
      </div>
    </div>
  );
}

export { Chat };
