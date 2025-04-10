import {pool} from "../config/config.js";

const getAllProducts = async () => {
    let [data] = await pool.query("SELECT * FROM store");
    return data
}


const getProductById = async (product_id) => {
    let [data] = await pool.query("SELECT * FROM store WHERE product_id = ?", [product_id]);
    return data
}


// const getProductsBySupplier = async (supplier) => {
//     let [data] = await pool.query("SELECT * FROM store WHERE supplier = ?", [supplier]);
//     return data
// }


// const getProductsByCategory = async (categories) => {
//     let [data] = await pool.query("SELECT * FROM store WHERE BINARY categories = ?", [categories]);
//     return data;
// };



// const addProduct = async (product) => {
//     let [data] = await pool.query("INSERT INTO store SET ?", [product]);
// }
const addProduct = async ({name,description,price,stock,supplier,categories,image_url}) => {
    let [data] = await pool.query("INSERT INTO store (name,description,price,stock,supplier,categories,image_url) VALUES (?,?,?,?,?,?,?)", [name,description,price,stock,supplier,categories,image_url]);
}


const deleteProduct = async (product_id) => {
    let [data] = await pool.query("DELETE FROM store WHERE product_id = ?", [product_id]);
}


const updateProduct = async (product_id,{name,description,price,stock,supplier,categories,image_url}) => {
    let [data] = await pool.query("UPDATE store SET name = ?, description = ?, price = ?, stock = ?, supplier = ?, categories = ?, image_url = ? WHERE product_id = ?", [name,description,price,stock,supplier,categories,image_url,product_id]);
}


export {getAllProducts, getProductById, addProduct, deleteProduct, updateProduct}

