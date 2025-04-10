import {getAllArticles, getArticleById, addArticle, deleteArticle, updateArticle} from "../models/articles_db.js";

const getAllArticlesCon = async (req, res) => {
    try {
        res.status(200).json(await getAllArticles());
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting all articles"
        });
    }
}

// const getAllArticlesOrderByDateCon = async (req, res) => {
//     try {
//         await getAllArticlesOrderByDate();
//         res.status(200).json({
//             message:"Successfully got all articles ordered by date"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting all articles ordered by date"
//         });
//     }
// }

// const getAllArticlesOrderByAuthorCon = async (req, res) => {
//     try {
//         await getAllArticlesOrderByAuthor();
//         res.status(200).json({
//             message:"Successfully got all articles ordered by author"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting all articles ordered by author"
//         });
//     }
// }

const getArticleByIdCon = async (req, res) => {
    try {
        res.status(200).json(await getArticleById(req.params.article_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting article by id"
        });
    }
}

const addArticleCon = async (req, res) => {
    try {
        await addArticle(req.body);
        res.status(200).json({
            message:"Article added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding article"
        });
    }
}

const deleteArticleCon = async (req, res) => {
    try {
        await deleteArticle(req.params.article_id);
        res.status(200).json({
            message:"Article deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting article"
        });
    }
}

const updateArticleCon = async (req, res) => {
    try {
        await updateArticle(req.params.article_id, req.body);
        res.status(200).json({
            message:"Article updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating the article"   
        })
    }
}

export {getAllArticlesCon, getArticleByIdCon, addArticleCon, deleteArticleCon, updateArticleCon};
