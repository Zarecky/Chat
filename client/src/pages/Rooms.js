import React from "react";
import { Col, Row, ListGroup, ListGroupItem, Button, Input } from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import { state } from "../index";
import { getRooms, createRoom } from "../API/rooms";

export default class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      roomTitle: "",
    };

    this.container = React.createRef();

    this.getRooms = this.getRooms.bind(this);
  }

  componentDidMount() {
    this.getRooms();
  }

  getRooms() {
    getRooms((err, rooms) => {
      if (rooms) {
        console.log(rooms);
        this.setState({
          rooms,
        });
      }
    });
  }

  handleCreateRoomButton = () => {
    if (this.state.roomTitle !== "") {
      createRoom(
        {
          title: this.state.roomTitle,
        },
        (err, rooms) => {
          if (rooms) {
            this.setState({
              rooms,
            });
          }
        }
      );
    }
  };

  render() {
    if (!state.user.authenticated) {
      return <Redirect to="/login" />;
    }

    console.log(this.state.rooms);

    return [
      <Row>
        <h1>Rooms</h1>
      </Row>,
      <Row>
        <Col>
          <Input
            onChange={(e) => this.setState({ roomTitle: e.target.value })}
            className="border-danger m-2"
            placeholder="Title"
            value={this.state.roomTitle}
          />
        </Col>
        <Col className="d-flex align-items-center">
          <Button color="danger" onClick={this.handleCreateRoomButton}>
            Create room
          </Button>
        </Col>
      </Row>,
      <Row>
        <Col>
          <ListGroup>
            {this.state.rooms.map((room) => (
              <ListGroupItem key={room.id}>
                <Link to={`/rooms/${room.id}`}>{room.title}</Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>,
    ];
  }
}
