const db = require ("../config")
class Books{
    // fetch all orders
    fetchBooks(req,res){
        const query =`
        SELECT bookID,bookTitle,category,bookURL
        FROM Books;
        `
        db.query(query,
            (err,results) => {
                if(err) throw err
                res.json({
                    status:res.statusCode,
                    results
                })
            })
    }
    // fetch single order
    fetchBook(req, res){
        const query = `
        SELECT bookID,bookTitle,category,bookURL
        FROM Books;
        WHERE bookID = ${req.params.id}
        `
        db.query(query,
            (err, result) => {
               if(err) throw err
               res.json({
                   status: res.statusCode,
                   result
               })
            } )
    }
    
    updateBook(req, res){
        const query =`
        UPDATE Books
        SET ?
        WHERE bookID = ?
        `
        db.query(query,[req.body, req.params],
            (err) => {
                if(err) throw err
                res.json({
                    status: res.statusCode,
                    msg:"The Book record was updated."
                })
            })
    }
    deleteBook(req,res){
        const query =
         `
        DELETE FROM Books
        WHERE bookID = ${req.params.id};
        `
        db.query(query, (err) => {
            if(err) throw err
            res.json({
        status:res.statusCode,
        msg:'The Book record was deleted.'
        })
        })
    }
}

module.exports  = Books;
