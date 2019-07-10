import React from 'react';
import {Button, Col, FormGroup, Input, Row, Form} from "reactstrap";
import socket from '../API/socket';
import Message from "./Message";


export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: []
    };

    this.container = React.createRef();

    this.getMessage = this.getMessage.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  getMessage(data) {
    this.setState((prevState) => ({messages: [...prevState.messages, ...data]}));
    this.scrollToBottom();
  };

  scrollToBottom() {
    const container = this.container.current;
    container.scrollTop = container.scrollHeight - container.clientHeight;
  }

  handleChange(e) {
    const message = e.target.value;
    this.setState(() => ({
      message
    }));
  }

  handleSend(e) {
    e.preventDefault();

    const now = Date.now();
    socket.sendMessage(this.state.message, now);
    this.setState(() => ({message: ""}));
  };

  componentDidMount() {
    socket.connect(this.getMessage);
  }

  componentWillUnmount() {
    socket.disconnet();
  }

  render() {
    return [
      <Row>
        <h1>Chat room</h1>
      </Row>,
      <Row>
        <Col>
          <div
            ref={this.container}
            className="border border-danger rounded p-3 mb-3 overflow-auto"
            style={{height: '60vh'}}
          >
            {this.state.messages
              .map(item => <Message {...item}/>)
            }
          </div>
        </Col>
      </Row>,
      <Row>
        <Col>
          <Form className="pr-3">
            <FormGroup row>
              <Col>
                <Input
                  onChange={this.handleChange}
                  className="border border-danger"
                  type="text"
                  name="message"
                  placeholder="Message"
                  value={this.state.message}
                />
              </Col>
              <Button onClick={this.handleSend} outline color="danger">Send</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    ];
  }
}