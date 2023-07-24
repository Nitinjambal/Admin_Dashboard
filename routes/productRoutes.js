import express from "express";
import { addProduct, deleteProduct, showAllProducts, totalProducts, updateProduct } from "../controllers/productRoutes.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


//Add new product
router.post("/newProduct",addProduct)



//get products
router.get("/allProducts",isAuthenticated,showAllProducts )


//update and delete product
router.route("/:id").put(isAuthenticated,updateProduct).delete(isAuthenticated,deleteProduct)


//Total products
router.get("/totalproducts",totalProducts )





export default router;