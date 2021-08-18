const router = require("express").Router();
const { MessageModel } = require("../models");
const {Banned} = require("../middleware")

//! Create Message

router.post("/create", Banned, async (req, res) => {
  const { content, likes, room } = req.body;
  const { id } = req.user;
  try {
    const newMessage = await MessageModel.create({
      content,
      likes,
      room,
      owner: id
    });
    res.status(200).json({
      message: "message successfully created",
      postedMessage: newMessage,
    });
  } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
});

//! Display Messages by room

router.get("/:room", async (req, res) => {
    const {room} = req.params
  const messages = await MessageModel.findAll({
      where: {
        room
      }
  });
  try {
    res.status(200).json({
      messages: messages,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

//! Edit Message

router.put("/edit/:id", Banned, async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user.id;
  const { content, likes } = req.body;

  let query = { where: { id, owner: ownerId } };

  let template = {
    content,
    likes
  };

  try {
    let updatedMessage = await MessageModel.update(template, query);
    res.status(200).json({
      updatedMessage,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

//! Delete Message
router.delete("/delete/:id", Banned, async (req, res) => {
    const { id } = req.params;
    const ownerId = req.user.id;
    const { isAdmin } = req.user;
    let query = isAdmin ? { where: { id } } : { where: { id, owner: ownerId } };

    try{
        const deletedMessage = await MessageModel.destroy(query)
        res.status(200).json({
            deletedMessage: deletedMessage
        })
    }catch(err) {
        res.status(500).json({
           error: err
        })
    }
})

module.exports = router;
