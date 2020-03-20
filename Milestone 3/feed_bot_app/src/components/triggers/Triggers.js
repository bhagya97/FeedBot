import React, { useEffect, useState } from "react";
import { SideMenu } from "../SideMenu";
import {
  Header,
  Divider,
  Segment,
  Grid,
  Form,
  Icon,
  Container
} from "semantic-ui-react";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import {
  form_type,
  professor_list,
  course_list,
  department_list,
  broadcast_type
} from "./configLists";
import TopBar from "../TopBar";
class Triggers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: 1,
      startTime: -1,
      startDate: -1,
      trigger: 1,
      lists: {}
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      ...this.state,
      lists: {
        ...this.state.lists,
        form_type,
        broadcast_type,
        department_list,
        course_list,
        professor_list
      }
    });
  }

  selectProfessor = () => {
    const prof = this.state.lists.professor_list.find(p => {
      return p.course === this.state.course;
    });
    if (prof !== undefined) {
      return prof.course;
    }
  };

  showDepartment = () => {
    if (this.state.broadcast === 2) {
      return (
        <Form.Group widths="equal" inline>
          <Form.Dropdown
            selection
            label="Department"
            options={this.state.lists.department_list}
            placeholder="Select"
            onChange={(e, { value }) => {
              this.setState({
                department: value
              });
            }}
          />

          <Form.Dropdown
            selection
            label="Course"
            options={this.state.lists.course_list}
            placeholder="Select"
            onChange={(e, { value }) => {
              this.setState({
                course: value
              });
            }}
          />

          <Form.Dropdown
            selection
            label="Instructor"
            options={this.state.lists.professor_list}
            placeholder="Select"
            value={this.selectProfessor()}
            onChange={(e, { value }) => {
              this.setState({
                professor: value
              });
            }}
          />
        </Form.Group>
      );
    } else {
      return "";
    }
  };

  showDateTime = () => {
    if (this.state.trigger === 2) {
      return (
        <Form.Group widths="equal" inline>
          <DateInput
            placeholder="Date"
            label="Scheduled Date"
            popupPosition="bottom right"
            className="example-calendar-input"
            name="date"
            closable
            clearIcon={<Icon name="remove" color="red" />}
            clearable={true}
            animation="scale"
            duration={200}
            hideMobileKeyboard
            value={this.state.startDate}
            iconPosition="left"
            preserveViewMode={false}
            autoComplete="off"
            onChange={(e, { value }) => {
              this.setState({
                startDate: value
              });
            }}
          />
          <TimeInput
            placeholder="Time"
            label="Scheduled Time"
            popupPosition="bottom right"
            className="example-calendar-input"
            name="time"
            animation="horizontal flip"
            duration={300}
            closable
            autoComplete="off"
            hideMobileKeyboard
            clearable={true}
            value={this.state.startTime}
            iconPosition="left"
            onChange={(e, { value }) => {
              this.setState({
                startTime: value
              });
            }}
          />
        </Form.Group>
      );
    } else {
      return "";
    }
  };

  submitFrom = () => {
    const { lists, ...form } = this.state;
    console.log({ ...form });
  };
  render() {
    return (
      <Container fluid style={{ minHeight: "100vh" }}>
        <TopBar />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={3}>
              <SideMenu activeItem="triggers" />
            </Grid.Column>
            <Grid.Column
              
              width={12}
              style={{ "padding-top": "3.5rem" }}
            >
              <Header>Triggers</Header>
              <Divider />
              <Form>
                <Form.Group widths="equal" inline>
                  <Form.Select
                    label="Form Type"
                    options={this.state.lists.form_type}
                    defaultValue={this.state.lists.form_type[0].value}
                    onChange={(e, { value }) => {
                      this.setState({
                        formType: value
                      });
                    }}
                  />
                  <Form.Select
                    label="Broadcast Type"
                    options={this.state.lists.broadcast_type}
                    defaultValue={this.state.lists.broadcast_type[0].value}
                    onChange={(e, { value }) => {
                      this.setState({
                        broadcast: value
                      });
                    }}
                  />
                </Form.Group>

                {this.showDepartment()}
                <Form.Group inline>
                  <label>Trigger: </label>
                  <Form.Radio
                    label="Imidiate"
                    value={1}
                    checked={this.state.trigger === 1}
                    onChange={(e, { value }) => {
                      this.setState({
                        trigger: value
                      });
                    }}
                  />
                  <Form.Radio
                    label="Scheduled"
                    value={2}
                    checked={this.state.trigger === 2}
                    onChange={(e, { value }) => {
                      this.setState({
                        trigger: value
                      });
                    }}
                  />
                </Form.Group>
                {this.showDateTime()}
                <Form.Button
                  primary
                  onClick={() => {
                    this.submitFrom();
                  }}
                >
                  Submit
                </Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export { Triggers };
