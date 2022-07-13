import Order from '../../../models/Order';
import dbConnect from '../../../utils/mongo';

const handler = async (req, res) => {
  const {
    method,
    query: { id: orderId },
  } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const order = await Order.findById(orderId);

      if (!order) {
        return res
          .status(404)
          .json(`No order found with the given ID → ${orderId}`);
      }

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  if (method === 'PATCH') {
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { $set: { ...req.body } },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!order) {
        return res
          .status(404)
          .json(`No order found with the given ID → ${orderId}`);
      }

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  if (method === 'DELETE') {
  }
};

export default handler;
