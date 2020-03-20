import React, { useEffect, useState } from "react";
import { SideMenu } from "../SideMenu";
import {
  Header,
  Grid,
  Segment,
  Divider,
  Form,
  Container
} from "semantic-ui-react";
import {
  department_list,
  professor_list,
  course_list
} from "../triggers/configLists";
import { useHistory } from "react-router-dom";
import TopBar from "../TopBar";

function Analysis() {
  const [lists, setLists] = useState({ department_list });
  const [courseId, setCourseId] = useState("");
  const history = useHistory();
  const updateCourse = department_id => {
    setLists({
      ...lists,
      course_list: course_list.filter(c => {
        return c.dept === department_id;
      })
    });
  };
  const enableSubmit = () => {
    if (courseId === "") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      <TopBar />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={3}>
            <SideMenu activeItem="analysis" />
          </Grid.Column>
          <Grid.Column width={12} style={{ "padding-top": "3.5rem" }}>
            <Header>Analysis</Header>
            <Divider />
            <Form>
              <Form.Dropdown
                selection
                label="Department"
                options={lists.department_list}
                placeholder="Select"
                onChange={(e, { value }) => {
                  updateCourse(value);
                }}
              />

              <Form.Dropdown
                selection
                label="Course"
                options={lists.course_list}
                placeholder="Select"
                onChange={(e, { value }) => {
                  setCourseId(value);
                }}
              />
              <Form.Button
                primary
                disabled={enableSubmit()}
                onClick={() => {
                  history.push("/report/" + courseId);
                }}
              >
                Submit
              </Form.Button>
              {/* <Form.Dropdown
                selection
                label="Instructor"
                options={lists.professor_list}
                placeholder="Select"
                value={this.selectProfessor()}
                onChange={(e, { value }) => {
                  setLists({
                    professor: value
                  });
                }}
              /> */}
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export { Analysis };
