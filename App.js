import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Container, Col, Row } from "react-bootstrap";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import Wea from "./Wea";

const App = () => {
  return (
    <>
      <Wea />
    </>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
