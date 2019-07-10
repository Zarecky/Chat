import React, {useState} from "react";
import {Button, Form, Input, Row, Col, FormGroup} from "reactstrap";
import {login} from "../API/auth";

export default function Login(props) {

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [invalid, setInvalid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    login({name, pass}, (err) => {
      if (err) {
        setName("");
        setPass("");
        setInvalid(true);
        return;
      }
      props.history.push('/');
    });
  };

  return [
    <Row>
      <h1>Sign in</h1>
    </Row>,
    <hr className="border-danger"/>,
    <Row>
      <Col md="8" lg="5">
        <Form>
          {invalid ?
            <Row>
              <Col>
                <div className="text-danger">
                  Invalid name or password
                </div>
              </Col>
            </Row>
            : null}
          <FormGroup>
            <Input
              invalid={invalid}
              onChange={(e) => setName(e.target.value)}
              className="border-danger m-2"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              invalid={invalid}
              onChange={(e) => setPass(e.target.value)}
              className="border-danger m-2"
              type="password"
              name="pass"
              placeholder="Password"
              value={pass}
            />
          </FormGroup>
          <Button onClick={handleSubmit} color="danger" outline className="m-2">Sign in</Button>
        </Form>
      </Col>
    </Row>
  ];

}