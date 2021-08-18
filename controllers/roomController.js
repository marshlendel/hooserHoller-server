const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize");
const { RoomModel } = require("../models");
const {Banned} = require("../middleware")

//! Create room

router.post("/create", Banned, async (req, res) => {
  const { name, description, isPrivate, addedUsers } = req.body;
  const { id } = req.user;
  try {
    const newRoom = await RoomModel.create({
      name,
      description,
      isPrivate,
      addedUsers,
      owner: id,
    });
    res.status(200).json({
      message: "Room successfully created",
      createdRoom: newRoom,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "This room name is already in use",
      });
    } else {
      res.status(500).json({
        error: err,
      });
    }
  }
});

//! Display Rooms

router.get("/", async (req, res) => {
  const rooms = await RoomModel.findAll();
  try {
    res.status(200).json({
      rooms: rooms,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

//! Edit Room

router.put("/edit/:id", Banned, async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user.id;
  const { isAdmin } = req.user;
  const { name, description } = req.body;
  let query = isAdmin ? { where: { id } } : { where: { id, owner: ownerId } };

  let template = {
    name,
    description,
  };

  try {
    let updatedRoom = await RoomModel.update(template, query);
    res.status(200).json({
      updatedRoom,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

//! Delete room
router.delete("/delete/:id", Banned, async (req, res) => {
    const { id } = req.params;
    const ownerId = req.user.id;
    const { isAdmin } = req.user;
    let query = isAdmin ? { where: { id } } : { where: { id, owner: ownerId } };

    try{
        const deletedRoom = await RoomModel.destroy(query)
        res.status(200).json({
            deletedRoom: deletedRoom
        })
    }catch(err) {
        res.status(500).json({
           error: err
        })
    }
})

module.exports = router;
