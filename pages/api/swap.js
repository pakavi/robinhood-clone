import { client } from "../../lib/sanityClient.js";


const swapTokens = async (req, res) => {
  try {
    const txDoc = {
      _type: "transactions",
      _id: req.body.txHash,
      txHash: req.body.txHash,
      fromAddress: req.body.from,
      toAddress: req.body.to,
      amount: req.body.amount,
      timestamp: new Date(Date.now()).toISOString(),
    };

    await client.createIfNotExists(txDoc);
    res.status(201).send({ message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "error", data: err.message });
  }
};

export default swapTokens;
