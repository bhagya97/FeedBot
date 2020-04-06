import React, { useState } from "react";
import { SideMenu } from "../SideMenu";
import {
  Header,
  Sidebar,
  Form,
  Divider,
  Segment,
  Container,
  Grid
} from "semantic-ui-react";
// import df from "react-jsonschema-form";

function Forms() {
  const [questiontype, setquestiontype] = useState(1);
  const options = [
    { key: 1, text: "Text", value: 1 },
    { key: 2, text: "Multiple Choice", value: 2 }
  ];
  const addQuestion = () => {
    console.log(questiontype);
    
  };
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={3}>
          <SideMenu activeItem="forms" />
        </Grid.Column>
        <Grid.Column as={Segment} width={12}>
          <Header>Forms</Header>
          <Divider />
          <Form>
            <Form.Field>
              <label>Form Name</label>
              <input placeholder="Form Name" />
            </Form.Field>
            <Form.Group widths="equal" inline>
              <Form.Button onClick={addQuestion.bind(this)}>
                Add Qustion
              </Form.Button>
              <Form.Select
                fluid
                label="Question Type"
                options={options}
                placeholder="Select"
                defaultValue={options[0].value}
                onChange={(e, { value }) => {
                  setquestiontype(value);
                }}
              />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export { Forms };
