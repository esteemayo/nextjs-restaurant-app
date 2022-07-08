import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'A prduct must have a title'],
      maxlength: 60,
    },
    slug: String,
    desc: {
      type: String,
      required: [true, 'A product must have a description'],
      maxlength: 200,
    },
    img: {
      type: String,
      required: [true, 'A product must have an image'],
    },
    prices: {
      type: [Number],
      required: [true, 'A product must have a price'],
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
