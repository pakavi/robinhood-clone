import { client } from "../../lib/sanityClient.js";


const createUser = async (req, res) => {
  try {
    const userDoc = {
      _type: "users",
      _id: req.body.walletAddress,
      userName: "Unnamed",
      address: req.body.walletAddress,
    };

    await client.createIfNotExists(userDoc);
    res.status(201).send({ message: "success" });
  } catch (err) {
    res.status(500).send({ message: "error", data: err.message });
  }
};

export default createUser;
