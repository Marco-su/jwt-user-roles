//---Imports
import Product from "../models/Product";

//---Create product
export const createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body;

  const newProduct = new Product({
    name,
    category,
    price,
    imgURL,
  });
  const productSaved = await newProduct.save();

  res.json(productSaved);
};

//---Get products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

//---Get product by id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

//---Update product
export const updateProducById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedProduct);
};

//---Delete product
export const deleteProductById = async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.json(deletedProduct);
};
