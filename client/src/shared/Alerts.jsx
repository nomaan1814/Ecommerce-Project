import React from "react";
import { Alert } from "react-bootstrap";
function Alerts({ variant, children }) {
  return (
    <div>
      <Alert variant={variant}>{children}</Alert>
    </div>
  );
}

export default Alerts;
