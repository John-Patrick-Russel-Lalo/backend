import * as BookModel from '../models/bookModel.js';

export const fetchBooks = async (req, res) => {
    try {
        const books = await BookModel.getBooks();
        res.status(200).json({sucess: true, message: books});
    } catch(e){
        console.log(e);
        res.status(500).json({
            sucess: false,
            message: "Interval Server Error"
        })
    }
};