import React, { useState, useEffect } from "react";
import { SideMenu } from "../SideMenu";
import TopBar from "../TopBar";
import { Header, Divider, Grid, Container } from "semantic-ui-react";
import Form from "react-jsonschema-form";
import { schema, uiSchema } from "./form-config";
import { API_URL } from "../../constants/urls";

function Forms() {
  const submitForm = ({ formData }) => {
    fetch(API_URL + "/saveform", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ formData: formData }),
    }).then((response) => console.log(response));
  };

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      <TopBar />
      <Grid columns={2} style={{ height: "100%" }}>
        <Grid.Row>
          <Grid.Column width={3}>
            <SideMenu activeItem="forms" />
          </Grid.Column>
          <Grid.Column width={12} style={{ paddingTop: "3.5rem" }}>
            <Header>Forms</Header>
            <Divider />
            <Form
              schema={schema}
              uiSchema={uiSchema}
              onSubmit={(d, e) => {
                submitForm(d);
              }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export { Forms };
