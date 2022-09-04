import dbConnect from '@/utils/mongo';
import Product from '@/models/Product';

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { id: productId },
  } = req;

  const token = cookies.token;

  await dbConnect();

  if (method === 'GET') {
    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json(`No product found with the given ID → ${productId}`);
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${method} is not allowed` });
  }

  if (method === 'PATCH') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated');
    }

    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { $set: { ...req.body } },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!product) {
        return res
          .status(404)
          .json(`No product found with the given ID → ${productId}`);
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).json({ message: `Method ${method} is not allowed` });
  }

  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated');
    }

    try {
      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return res
          .status(404)
          .json(`No product found with the given ID → ${productId}`);
      }

      res.status(204).json({
        product: null,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ message: `Method ${method} is not allowed` });
  }
}
