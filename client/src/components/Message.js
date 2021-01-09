import React from "react";
import { Alert, Col, Row } from "reactstrap";
import { getDate, state } from "../index";

export default function Message(props) {
  console.log(props.type);
  if (props.type === "USER") {
    const date = (
      <div className="text-black-50 ml-2 mr-2">{getDate(props.created_at)}</div>
    );

    return (
      <Row>
        <Col
          className={`d-flex align-items-center ${
            state.user.name === props.user ? " justify-content-end" : ""
          }`}
        >
          {state.user.name === props.user && date}
          <Alert
            className="p-1 pl-2 pr-2 mt-1 mb-1"
            color={state.user.name === props.user ? "danger" : "info"}
          >
            <strong>{props.user}: </strong>
            {props.message}
          </Alert>
          {state.user.name !== props.user && date}
        </Col>
      </Row>
    );
  } else if (props.type.indexOf("SERVICE") >= 0) {
    return (
      <Row>
        <Col>
          <div className="text-center text-black-50 m-2">
            User "{props.user}"{" "}
            {props.type === "SERVICE_DISCONNECT" ? "left chat" : "joined"} at{" "}
            {getDate(props.created_at)}
          </div>
        </Col>
      </Row>
    );
  }
}
