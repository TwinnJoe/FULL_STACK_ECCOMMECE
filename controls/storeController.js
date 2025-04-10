import {getAllProducts, getProductById, addProduct, deleteProduct, updateProduct} from "../models/store_db.js";

const getAllProductsCon = async (req, res) => {
    try {
        res.status(200).json(await getAllProducts());
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting all products"
        })
    }
}

const getProductsByIdCon = async (req, res) => {
    try {
        res.status(200).json(await getProductById(req.params.product_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting the product"
        })
    }
}

// const getProductsBySupplierCon = async (req, res) => {
//     try {
//         await getProductsBySupplier(req.params.supplier);
//         res.status(200).json({
//             message:"Products found successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting the products"
//         })
//     }
// }

// const getProductsByCategoryCon = async (req, res) => {
//     try {
//         const category = req.params.category; // Get the category from URL params
//         const products = await getProductsByCategory(category); // Pass it to the model function

//         res.status(200).json(products);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error: "There was an error while getting the products"
//         });
//     }
// };


const addProductCon = async (req, res) => {
    try {
        await addProduct(req.body);
        res.status(200).json({
            message:"Product added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding the product"
        })
    }
}

const deleteProductCon = async (req, res) => {
    try {
        await deleteProduct(req.params.product_id);
        res.status(200).json({
            message:"Product deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting the product"
        })
    }
}

const updateProductCon = async (req, res) => {
    try {
        await updateProduct(req.params.product_id, req.body);
        res.status(200).json({
            message:"Product updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating the product"
        })
    }
}

export {getAllProductsCon, getProductsByIdCon, addProductCon, deleteProductCon, updateProductCon};