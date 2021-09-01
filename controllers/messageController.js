const router = require("express").Router();
const { MessageModel } = require("../models");
const {Banned} = require("../middleware")

//! Create Message

router.post("/create", Banned, async (req, res) => {
  const {pic, content, name, roomId, likes, date, time } = req.body;
  const { id } = req.user;
  try {
    const newMessage = await MessageModel.create({
      pic,
      content,
      name,
      roomId,
      likes,
      date,
      time,
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

router.get("/:roomId", async (req, res) => {
    const {roomId} = req.params
  const messages = await MessageModel.findAll({
      where: {
        roomId: roomId
      },
      order: [
        ["id", "ASC"]
      ]
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
  const {likes } = req.body;

  let query = { where: { id} };

  let template = {
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
            theDeletedMessage: deletedMessage,
            message: deletedMessage ? "Message deleted" : "You can only delete your own messages"
        })
    }catch(err) {
        res.status(500).json({
           error: err
        })
    }
})

module.exports = router;
