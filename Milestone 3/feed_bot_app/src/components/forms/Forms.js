import React, { useState } from "react";
import { SideMenu } from "../SideMenu";
import { Header, Divider, Segment, Grid, Button } from "semantic-ui-react";
import Form from "react-jsonschema-form";
import { schema, uiSchema } from "./form-config";
function Forms() {
  const submitForm = data => {
    console.log(JSON.stringify(data));
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
