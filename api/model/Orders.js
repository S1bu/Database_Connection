const db = require ("../config")
// This will have all the functionality
 

class Orders{
    // fetch all orders
fetchOrders(req,res){
    const query =`
    SELECT orderID,userID,bookID,orderDate
    FROM Orders;
    `
    // throw in err
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
fetchOrder(req, res){
    const query = `
    SELECT orderID,userID,bookID,orderDate
    FROM Orders;
    WHERE orderID = ${req.params.id}
    `
    // throw in err 
    db.query(query,
        (err, result) => {
           if(err) throw err
           res.json({
               status: res.statusCode,
               result
           })
        } )
}

updateOrder(req, res){
    const query =`
    UPDATE Orders
    SET?
    WHERE OrderID=?
    `
    db.query(query,[req.body, req.params],
        (err) => {
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg:"The Order record was updated."
            })
        })
}

deleteOrder(req,res){
    const query =
     `
    DELETE FROM Orders
    WHERE orderID = ${req.params.id};
    `
    db.query(query, (err) => {
        if(err) throw err
        res.json({
    status:res.statusCode,
    msg:'The Order records were deleted.'
    })
    })
}
}
module.exports  = Orders;
