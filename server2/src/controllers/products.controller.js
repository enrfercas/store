import Product from "../models/Product";

/* export const createProduct = async (req, res) => {
    console.log(req.body);

    const { title, category, price, img, description, id } = req.body;
    const newProduct = new Product({ title, category, price, imgURL });
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
} */
export const createProduct = async (req, res) => {
  try {
      console.log(req.body);

      const { title, category, price, img, description, id } = req.body;
      const newProduct = new Product({ title, category, price, img, description, id });
      const productSaved = await newProduct.save();
      res.status(201).json(productSaved);
  } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
}

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(updatedProduct);
    console.log(req.body);
}


export const deleteProductById = async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    res.status(204).json();

}
