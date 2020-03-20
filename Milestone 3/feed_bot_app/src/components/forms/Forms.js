import React, { useState, useEffect } from "react";
import { SideMenu } from "../SideMenu";
import { Header, Divider, Segment, Grid, Button } from "semantic-ui-react";
import Form from "react-jsonschema-form";
import { schema, uiSchema } from "./form-config";
import { Auth } from "aws-amplify";
function Forms() {
  const submitForm = data => {
    console.log(JSON.stringify(data));
  };
  useEffect(() => {
    Auth.currentUserInfo().then(user=>console.log(user));
  }, []);
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={3}>
          <SideMenu activeItem="forms" />
        </Grid.Column>
        <Grid.Column as={Segment} width={12}>
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
  );
}

export { Forms };
