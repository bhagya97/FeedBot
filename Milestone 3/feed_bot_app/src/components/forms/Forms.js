import React, { useState, useEffect } from "react";
import { SideMenu } from "../SideMenu";
import TopBar from "../TopBar";
import { Header, Divider, Grid, Container } from "semantic-ui-react";
import Form from "react-jsonschema-form";
import { schema, uiSchema } from "./form-config";
import { Auth } from "aws-amplify";
function Forms() {
  const submitForm = data => {
    console.log(JSON.stringify(data));
  };

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      <TopBar />
      <Grid columns={2} style={{ height: "100%" }}>
        <Grid.Row>
          <Grid.Column width={3}>
            <SideMenu activeItem="forms" />
          </Grid.Column>
          <Grid.Column width={12} style={{ "padding-top": "3.5rem" }}>
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
