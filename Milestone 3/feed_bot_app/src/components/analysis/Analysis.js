import React, { useEffect, useState } from "react";
import { SideMenu } from "../SideMenu";
import {
  Header,
  Grid,
  Segment,
  Divider,
  Form,
  Container,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import TopBar from "../TopBar";
import { API_URL } from "../../constants/urls";

function Analysis() {
  const [lists, setLists] = useState({});
  const [courseId, setCourseId] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const enableSubmit = () => {
    if (courseId === "") {
      return true;
    } else {
      return false;
    }
  };
  const fetchDepartments = () => {
    fetch(API_URL + "/departments")
      .then((response) => response.json())
      .then((responseJson) => {
        let departments = JSON.parse(responseJson.departments);
        departments = departments.map((item) => {
          return { text: item.name, value: item._id.$oid };
        });
        setLists({ ...lists, department_list: departments });
      });
  };
  const fetchCourses = (department) => {
    fetch(API_URL + "/courses?d_id=" + department)
      .then((response) => response.json())
      .then((responseJson) => {
        let courses = JSON.parse(responseJson.courses);
        courses = courses.map((item) => {
          return { text: item.name, value: item._id.$oid };
        });
        setLists({
          ...lists,
          course_list: courses,
        });
      });
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
                  fetchCourses(value);
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
