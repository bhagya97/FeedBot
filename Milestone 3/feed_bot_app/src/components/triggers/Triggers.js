import React, { useEffect, useState } from "react";
import { SideMenu } from "../SideMenu";
import {
  Header,
  Divider,
  Modal,
  Button,
  Grid,
  Form,
  Icon,
  Container,
} from "semantic-ui-react";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import { form_type, professor_list, broadcast_type } from "./configLists";
import TopBar from "../TopBar";
import { API_URL } from "../../constants/urls";

class Triggers extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      formType: 1,
      startTime: "Select Time",
      startDate: "Select Date",
      trigger: 1,
      modalOpen: false,
      lists: {},
    };
    this.state = { ...this.initialState };
  }

  UNSAFE_componentWillMount() {
    fetch(API_URL + "/forms")
      .then((response) => response.json())
      .then((responseJson) => {
        let forms = JSON.parse(responseJson.forms);
        forms = forms.map((item) => {
          return { text: item.FormName, value: item._id.$oid };
        });
        this.setState({
          lists: {
            ...this.state.lists,
            form_type: [{ text: "Chatbot", value: 1 }, ...forms],
          },
        });
      });
    this.fetchDepartments();
    this.setState({
      lists: {
        ...this.state.lists,
        form_type,
        broadcast_type,
        professor_list,
      },
    });
  }

  selectProfessor = () => {
    const prof = this.state.lists.professor_list.find((p) => {
      return p.course === this.state.course;
    });
    if (prof !== undefined) {
      return prof.course;
    }
  };

  fetchDepartments = () => {
    fetch(API_URL + "/departments")
      .then((response) => response.json())
      .then((responseJson) => {
        let departments = JSON.parse(responseJson.departments);
        departments = departments.map((item) => {
          return { text: item.name, value: item._id.$oid };
        });
        this.setState({
          lists: {
            ...this.state.lists,
            department_list: departments,
          },
        });
      });
  };
  fetchCourses = (department) => {
    fetch(API_URL + "/courses?d_id=" + department)
      .then((response) => response.json())
      .then((responseJson) => {
        let courses = JSON.parse(responseJson.courses);
        courses = courses.map((item) => {
          return { text: item.name, value: item._id.$oid };
        });
        this.setState({
          lists: {
            ...this.state.lists,
            course_list: courses,
          },
        });
      });
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
                department: value,
              });
              this.fetchCourses(value);
            }}
          />

          <Form.Dropdown
            selection
            label="Course"
            options={this.state.lists.course_list}
            placeholder="Select"
            onChange={(e, { value }) => {
              this.setState({
                course: value,
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
                professor: value,
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
            popupPosition="right center"
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
                startDate: value,
              });
            }}
          />
          <TimeInput
            placeholder="Time"
            label="Scheduled Time"
            popupPosition="right center"
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
                startTime: value,
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
    const { lists, modalOpen, ...form } = this.state;
    console.log(form);
    fetch(API_URL + "/savetrigger", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ form: form }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson["code"] === 1) {
          this.setState({ modalOpen: true });
        }
      });
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
            <Grid.Column width={12} style={{ paddingTop: "3.5rem" }}>
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
                        formType: value,
                      });
                    }}
                  />
                  <Form.Select
                    label="Broadcast Type"
                    options={this.state.lists.broadcast_type}
                    defaultValue={this.state.lists.broadcast_type[0].value}
                    onChange={(e, { value }) => {
                      this.setState({
                        broadcast: value,
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
                        trigger: value,
                      });
                    }}
                  />
                  <Form.Radio
                    label="Scheduled"
                    value={2}
                    checked={this.state.trigger === 2}
                    onChange={(e, { value }) => {
                      this.setState({
                        trigger: value,
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
        <Modal
          size="mini"
          open={this.state.modalOpen}
          style={{ position: "relative", maxHeight: "200px" }}
        >
          <Modal.Header>Trigger Status</Modal.Header>
          <Modal.Content>
            <p>Trigger set successfully.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="OK"
              onClick={() => {
                this.setState({ modalOpen: false });
              }}
            />
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

export { Triggers };
