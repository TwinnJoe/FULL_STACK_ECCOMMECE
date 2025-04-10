import {pool} from "../config/config.js";

const getAllArticles = async () => {
    let [data] = await pool.query("SELECT * FROM articles ORDER BY article_id DESC");
    return data
}


// const getAllArticlesOrderByDate = async () => {
//     let [data] = await pool.query("SELECT * FROM articles ORDER BY puclished_date DESC");
//     return data
// }


// const getAllArticlesOrderByAuthor = async () => {
//     let [data] = await pool.query("SELECT * FROM articles ORDER BY author DESC");
//     return data
// }


const getArticleById = async (article_id) => {
    let [data] = await pool.query("SELECT * FROM articles WHERE article_id = ?", [article_id]);
    return data
}


const addArticle = async ({title, article_URL, author, published_date}) => {
    await pool.query("INSERT INTO articles (title, article_URL, author, published_date) VALUES (?,?,?,?)", [title, article_URL, author, published_date]);
}


const deleteArticle = async (article_id) => {
    await pool.query("DELETE FROM articles WHERE article_id = ?", [article_id]);
}


const updateArticle = async (article_id,{title, article_URL, author, published_date}) => {
    await pool.query("UPDATE articles SET title = ?, article_URL = ?, author = ?, published_date = ? WHERE article_id = ?", [title, article_URL, author, published_date, article_id]);
}


export { getAllArticles, getArticleById, addArticle, deleteArticle, updateArticle }

