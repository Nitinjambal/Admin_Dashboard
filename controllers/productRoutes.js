import ErrorHandler from "../middlewares/error.js";
import { Product } from "../models/product.js";


//Add Product
export const addProduct = async (req, res, next) => {

    try {
        const { image, title, description } = req.body;

        await Product.create({
            title,
            image,
            description,
            user: req.user
        })

        res.status(201).json({
            success: true,
            message: "Product Added Succussfully",
        })
    } catch (error) {
        console.log('error:', error)
        next(error)
    }
}


//show Products
export const showAllProducts = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const products = await Product.find({ user: userId })
        res.status(200).json({
            success: true,
            products,
        })
    } catch (error) {
        next(error)
    }
}

//update_Product
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        let product = await Product.findById(id);

        if (!product) return next(new ErrorHandler("Product Not Found", 404));
        product = await Product.findByIdAndUpdate({ _id: id }, { $set: { title: req.body.title, description: req.body.description } });


        res.status(200).json({
            success: true,
            message: "Product Got Updated Succussfully"
        })
    } catch (error) {
        next(error)

    }
}


//delete Product
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) return next(new ErrorHandler("Product Not Found", 404))

        await product.deleteOne();
        res.status(200).json({
            success: true,
            message: "Product Got Deleted"
        })

    } catch (error) {
        next(error);
    }
}



//whole product
export const totalProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            products,
        })
    } catch (error) {
        next(error)
    }
}
