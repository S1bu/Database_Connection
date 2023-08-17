// Import all models
class bookAuthors{
   // fetch all BookAuthors
   fetchBookAuthors(req,res){
    const query =`
    SELECT id,authorName,authorSurname,bookID
    FROM BookAuthor;
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
}
module.exports  = bookAuthors
 