import Order from '@/models/Order';
import dbConnect from '@/utils/mongo';

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const orders = await Order.find();
      res.status(200).json(orders).sort('-createdAt');
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${method} is not allowed` });
  }

  if (method === 'POST') {
    try {
      const order = await Order.create({ ...req.body });
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} is not allowed` });
  }
};

export default handler;
