import React, {useState} from "react";
import {Button, Form, Input, Row, Col, FormGroup, Label} from "reactstrap";
import {register} from "../API/auth";

export default function Register(props) {

  const [state, setState] = useState({
    pass: "",
    name: "",
    invalid: {
      pass: false,
      name: false,
    }
  });

  const handleChange = (e) => {
    const text = e.target.value;
    const field = e.target.name;
    setState({...state, [field]: text})
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      pass: state.pass,
      name: state.name,
    };

    const newState = Object.assign({}, state);
    for (let key in data) {
      if (data[key] === "") {
        newState.invalid[key] = true;
        setState(newState);
      } else {

        newState.invalid[key] = false;
        setState(newState);
      }
    }

    for (let key in data) {
      if (data[key] === "") {
        return;
      }
    }

    register(data, () => {
      props.history.push('/');
    });
  };

  return [
    <Row>
      <h1>Sign up</h1>
    </Row>,
    <hr className="border-danger"/>,
    <Row>
      <Col md="8" lg="5">
        <Form>
          <FormGroup>
            <Label className="m-0" for="inputName">Name</Label>
            <Input
              invalid={state.invalid.name}
              onChange={handleChange}
              className="border-danger m-2"
              type="text"
              id="inputName"
              name="name"
              placeholder="Name"
              value={state.name}/>
          </FormGroup>
          <FormGroup>
            <Label className="m-0" for="inputPassword">Password</Label>
            <Input
              invalid={state.invalid.pass}
              onChange={handleChange}
              className="border-danger m-2"
              type="password"
              id="inputPassword"
              name="pass"
              placeholder="Password"
              value={state.pass}/>
          </FormGroup>
          <Button onClick={handleSubmit} color="danger" outline className="mt-5">Sign up</Button>
        </Form>
      </Col>
    </Row>
  ];
}