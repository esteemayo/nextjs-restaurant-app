import Order from '../../../models/Order';
import dbConnect from '../../../utils/mongo';

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  if (method === 'POST') {
    try {
      const order = await Order.create({ ...req.body });
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
};

export default handler;
