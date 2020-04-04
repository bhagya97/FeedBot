import React, { useState, useEffect } from "react";
import { SideMenu } from "./SideMenu";
import TopBar from "./TopBar";
import {
  Header,
  Divider,
  Grid,
  Container,
  Form,
  Button,
} from "semantic-ui-react";
// import { ChatBot } from "aws-amplify-react";
import { ChatFeed, Message } from "react-chat-ui";

function Chat() {
  const [currentMsg, setcurrentMsg] = useState("");
  const [messages, setMessages] = useState([
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }),
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
  ]);

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      <TopBar />
      <Grid columns={2} style={{ height: "100%" }}>
        <Grid.Row>
          <Grid.Column width={3}>
            <SideMenu activeItem="forms" />
          </Grid.Column>
          <Grid.Column width={12} style={{ paddingTop: "3.5rem" }}>
            <Header>Chat</Header>
            <Divider />
            {/* <ChatBot
              title="My Bot"
              botName="FeedBot"
              welcomeMessage="Hope you are doing good! Type 'Get Started' to Start"
              // onComplete={this.handleComplete.bind(this)}
              clearOnComplete={true}
              conversationModeOn={false}
            /> */}
            <Grid>
              <Grid.Column width={8}>
                <ChatFeed
                  messages={messages} // Boolean: list of message objects
                  hasInputField={false} // Boolean: use our input, or use your own
                  showSenderName // show the name of the user who sent the message
                  bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                  // JSON: Custom bubble styles
                  bubbleStyles={{
                    text: {
                      fontSize: 18,
                    },
                    chatbubble: {
                      borderRadius: 70,
                      padding: 8,
                    },
                  }}
                />
                <Form reply>
                  <Form.TextArea
                    value={currentMsg}
                    onChange={(e, { value }) => {
                      setcurrentMsg(value);
                    }}
                  />
                  <Button
                    content="Send"
                    labelPosition="left"
                    icon="send"
                    primary
                    onClick={()=>{
                      let msg = new Message({ id: 0, message: currentMsg });
                      setMessages([ ...messages, msg])
                      setcurrentMsg('');
                    }}
                  />
                </Form>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export { Chat };
