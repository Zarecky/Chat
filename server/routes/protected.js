const express = require("express");
const { Room } = require("../model/room");

const router = express.Router();

router.get("/profile", (req, res) => {
  console.log(req.user);
  res.send({
    name: req.user.name,
  });
});

router.get("/rooms", async (req, res) => {
  const rooms = await Room.getAllByOrder();
  res.send(rooms);
});

router.get("/rooms/:id", async (req, res) => {
  const room = await Room.query().findById(req.params.id);
  res.send(room);
});

router.post("/rooms/create", async (req, res) => {
  await Room.create(req.body.title);
  const rooms = await Room.getAllByOrder();
  res.send(rooms);
});

module.exports = router;
