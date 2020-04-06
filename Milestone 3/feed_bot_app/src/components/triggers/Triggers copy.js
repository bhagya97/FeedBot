import React, { useEffect, useState } from "react";
import { SideMenu } from "../SideMenu";
import { Header, Divider, Segment, Grid, Form, Icon } from "semantic-ui-react";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import {
  form_type,
  professor_list,
  course_list,
  department_list,
  broadcast_type
} from "./configLists";

class Triggers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: { broadcast: 1 },
      startTime: "",
      startDate: "",
      trigger: 1,
      lists: {}
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      ...this.state,
      lists: { ...this.state.lists, form_type, broadcast_type }
    });
  }

  // selectProfessor = () => {
  //   const prof = lists.professor_list.find(p => {
  //     return p.course === formType.course;
  //   });
  //   if (prof !== undefined) {
  //     return prof.course;
  //   }
  // };

  // showDepartment = () => {
  //   if (formType.broadcast === 2) {
  //     return (
  //       <Form.Group widths="equal" inline>
  //         <Form.Dropdown
  //           selection
  //           label="Department"
  //           options={lists.department_list}
  //           placeholder="Select"
  //           onChange={(e, { value }) => {
  //             setformType({ ...formType, department: value });
  //           }}
  //         />

  //         <Form.Dropdown
  //           selection
  //           label="Course"
  //           options={lists.course_list}
  //           placeholder="Select"
  //           onChange={(e, { value }) => {
  //             setformType({ ...formType, course: value });
  //           }}
  //         />

  //         <Form.Dropdown
  //           selection
  //           label="Instructor"
  //           options={lists.professor_list}
  //           placeholder="Select"
  //           value={selectProfessor()}
  //           onChange={(e, { value }) => {
  //             setformType({ ...formType, professor: value });
  //           }}
  //         />
  //       </Form.Group>
  //     );
  //   } else {
  //     return "";
  //   }
  // };

  // showDateTime = () => {
  //   if (formType.trigger === 2) {
  //     return (
  //       <Form.Group widths="equal" inline>
  //         <DateInput
  //           placeholder="Date"
  //           label="Scheduled Date"
  //           popupPosition="bottom right"
  //           className="example-calendar-input"
  //           name="date"
  //           closable
  //           clearIcon={<Icon name="remove" color="red" />}
  //           clearable={true}
  //           animation="scale"
  //           duration={200}
  //           hideMobileKeyboard
  //           value={startDate}
  //           iconPosition="left"
  //           preserveViewMode={false}
  //           autoComplete="off"
  //           onChange={(e, { value }) => {
  //             setStartDate(value);
  //           }}
  //         />
  //         <TimeInput
  //           placeholder="Time"
  //           label="Scheduled Time"
  //           popupPosition="bottom right"
  //           className="example-calendar-input"
  //           name="time"
  //           animation="horizontal flip"
  //           duration={300}
  //           closable
  //           autoComplete="off"
  //           hideMobileKeyboard
  //           clearable={true}
  //           value={startTime}
  //           iconPosition="left"
  //           onChange={(e, { value }) => {
  //             setStartTime(value);
  //           }}
  //         />
  //       </Form.Group>
  //     );
  //   } else {
  //     return "";
  //   }
  // };

  render() {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={3}>
            <SideMenu activeItem="triggers" />
          </Grid.Column>
          <Grid.Column as={Segment} width={12}>
            <Header>Triggers</Header>
            <Divider />
            {console.log(this.state.lists)}
            <Form>
              <Form.Group widths="equal" inline>
                <Form.Select
                  label="Form Type"
                  options={this.state.lists.form_type}
                  defaultValue={this.state.lists.form_type[0].value}
                  onChange={(e, { value }) => {
                    console.log(value);
                  }}
                />
                <Form.Select
                  label="Broadcast Type"
                  options={this.state.lists.broadcast_type}
                  defaultValue={this.state.lists.broadcast_type[0].value}
                  onChange={(e, { value }) => {
                    this.setState({
                      ...this.this.state,
                      formType: { ...this.state.formType, broadcast: value }
                    });
                  }}
                />
              </Form.Group>

              {/* {showDepartment()}
              <Form.Group inline>
                <label>Trigger: </label>
                <Form.Radio
                  label="Imidiate"
                  value={1}
                  checked={trigger === 1}
                  onChange={(e, { value }) => {
                    setTrigger(value);
                    setformType({ ...formType, trigger: value });
                  }}
                />
                <Form.Radio
                  label="Scheduled"
                  value={2}
                  checked={trigger === 2}
                  onChange={(e, { value }) => {
                    setTrigger(value);
                    setformType({ ...formType, trigger: value });
                  }}
                />
              </Form.Group>
              {showDateTime()} */}
              <Form.Button primary>Submit</Form.Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export { Triggers };
