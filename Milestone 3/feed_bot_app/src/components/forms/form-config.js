const schema = {
    type: "object",
    properties: {
      Questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            Question: {
              type: "string"
            }
          }
        }
      }
    }
  };
  const uiSchema = {
    Questions: {
      // note the "items" for an array
      items: {
        Question: {
          "ui:widget": "textarea"
        }
      }
    }
  };
  export { schema, uiSchema};