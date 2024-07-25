import React from "react";
import { Col, Label, Input } from "reactstrap";

const ReactstrapSelect1 = ({ name, label, options, ...rest }) => {
  return (
    <Col sm="6" className="form-group">
      <Label for={name}>{label}</Label>
      <Input type="select" name={name} {...rest}>
        {options && options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Input>
    </Col>
  );
};
export default ReactstrapSelect1;
