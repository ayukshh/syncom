import Message from "../models/model_user"

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(messages.reverse());
  } catch (err) {
    res.status(500).json({ error: "Failed to load messages" });
  }
};