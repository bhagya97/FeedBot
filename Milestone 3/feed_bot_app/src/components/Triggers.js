import React, { useState } from "react";
import { SideMenu } from "./SideMenu";
import { Header, Divider, Segment, Grid, Form, Icon } from "semantic-ui-react";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";

function Triggers() {
  const [formType, setformType] = useState({ broadcast: 1 });
  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [trigger, setTrigger] = useState(1);
  const form_type = [
    { key: 1, text: "Chatbot", value: 1 },
    { key: 2, text: "Form_1", value: 2 }
  ];
  const broadcast_type = [
    { key: 1, text: "All", value: 1 },
    { key: 2, text: "Department", value: 2 }
  ];
  const department_list = [
    { key: 1, text: "Computer Science", value: 1 },
    { key: 2, text: "Medical", value: 2 },
    { key: 3, text: "Engineering", value: 3 }
  ];
  const person_list = [
    { key: 1, text: "Professor", value: 1 },
    { key: 2, text: "Student", value: 2 }
  ];

  const showDepartment = () => {
    if (formType.broadcast === 2) {
      return (
        <Form.Group widths="equal" inline>
          <Form.Select
            multiple
            selection
            label="Department"
            options={department_list}
            placeholder="Select"
            onChange={(e, { value }) => {
              setformType({ ...formType, department: value });
            }}
          />

          <Form.Select
            multiple
            selection
            label="People"
            options={person_list}
            placeholder="Select"
            onChange={(e, { value }) => {
              setformType({ ...formType, people: value });
            }}
          />
        </Form.Group>
      );
    } else {
      return "";
    }
  };

  const showDateTime = () => {
    if (formType.trigger === 2) {
      return (
        <Form.Group widths="equal" inline>
          <DateInput
            placeholder="Date"
            popupPosition="bottom right"
            className="example-calendar-input"
            name="date"
            closable
            clearIcon={<Icon name="remove" color="red" />}
            clearable={true}
            animation="scale"
            duration={200}
            hideMobileKeyboard
            value={startDate}
            iconPosition="left"
            preserveViewMode={false}
            autoComplete="off"
            onChange={(e, { value }) => {
              setStartDate(value);
            }}
          />
          <TimeInput
            placeholder="Time"
            popupPosition="bottom right"
            className="example-calendar-input"
            name="time"
            animation="horizontal flip"
            duration={300}
            closable
            autoComplete="off"
            hideMobileKeyboard
            clearable={true}
            value={startTime}
            iconPosition="left"
            onChange={(e, { value }) => {
              setStartTime(value);
            }}
          />
        </Form.Group>
      );
    } else {
      return "";
    }
  };

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={3}>
          <SideMenu activeItem="triggers" />
        </Grid.Column>
        <Grid.Column as={Segment} width={12}>
          <Header>Triggers</Header>
          <Divider />
          <Form>
            <Form.Group widths="equal" inline>
              <Form.Select
                label="Form Type"
                options={form_type}
                defaultValue={form_type[0].value}
                onChange={(e, { value }) => {
                  console.log(value);
                }}
              />
              <Form.Select
                label="Broadcast Type"
                options={broadcast_type}
                defaultValue={broadcast_type[0].value}
                onChange={(e, { value }) => {
                  setformType({ ...formType, broadcast: value });
                }}
              />
            </Form.Group>

            {showDepartment()}
            <Form.Group inline>
              <label>Trigger: </label>
              <Form.Radio
                label="Imidiate"
                value={1}
                checked={trigger === 1}
                onChange={(e, { value }) => {
                  setTrigger(value);
                  setformType({...formType, trigger: value})
                }}
              />
              <Form.Radio
                label="Scheduled"
                value={2}
                checked={trigger === 2}
                onChange={(e, { value }) => {
                  setTrigger(value);
                  setformType({...formType, trigger: value})
                }}
              />
            </Form.Group>
            {showDateTime()}
            <Form.Button primary>Submit</Form.Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export { Triggers };
