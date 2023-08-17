const db = require ("../config")
 
const {hash, compare, hashSync} = require ('bcrypt')
const {createToken} = require('../middleware/AuthenticateUser')

class Users{
    fetchUsers(req, res){
        const query =`
        SELECT userID, firstName, lastName, gender, userDOB,
        emailAdd, profileURL
        FROM Users; `
        db.query(query,
             (err, results) => {
                if(err) throw err
                res.json({
                    status: res.statusCode,
                    results
                })
             } )
    }
    fetchUser(req, res){
        const query = `
        SELECT userID, firstName, lastName, gender, userDOB,
        emailAdd, profileURL
        FROM Users
        where userID = ${req.params.id};
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
    login(req, res) {
        const {emailAdd, userPass} = req.body // pipeline
        // query
        const query = `
        SELECT firstName, lastName,
        gender, userDOB, emailAdd, userPass,
        profileUrl
        FROM Users
        WHERE emailAdd = '${emailAdd}';
        `
        db.query(query, async (err, result)=>{
            if(err) throw err
            if(!result?.length){
                res.json({
                    status: res.statusCode,
                    msg: "You provided a wrong email."
                })
            }else{
                await compare(userPass,
                    result[0].userPass,
                    (cErr, cResult)=>{
                        if(cErr) throw cErr
                        // Create a token
                        const token =
                        createToken({
                            emailAdd,
                            userPass
                        })
                        // Save a token
                        res.cookie("LegitUser",
                        token, {
                            maxAge: 3600000,
                            httpOnly: true
                        })
                        if(cResult) {
                            res.json({
                                msg: "Logged in",
                                token,
                                result: result[0]
                            })
                        }else {
                            res.json({
                                status: res.statusCode,
                                msg:
                                "Invalid password or you have not registered"
                            })
                            console.log(token)
                        }
                    })
            }
        })
    }
   async register(req,res){
        const data = req.body
        // Encrypt password
        data.userPass = await hash(data.userPass,15)
        //Payload
        const user = {
            emailAdd:data.emailAdd,
            userPass:data.userPass
        }
        //creating user detail
        //Query
        const query = `
        INSERT INTO Users
        SET ?
        `
        // if you dont wanna use set ypu can use 'values(?,?,?,?,?,?,?,?)'
        db.query(query,[data],(err) => {
            if(err) throw err
            // create a Token
            let token = createToken(user)
            res.cookie("LegitUser", token, 
            {
                maxAge: 3600000,
                httpOnly: true
            });
            res.json ({
                status: res.statusCode,
                msg: "You are now registered"
            })
        })

        

        // async register(rew)
    }
    updateUser(req,res){
        const data = req.body
        if(data.userPass){
            data.userPass = 
            hashSync(data.userPass, 15)
        }
    const query =`
        UPDATE Users
        SET?
        WHERE userID =?
        `
        db.query(query,[req.body, req.params],
            (err) => {
                if(err) throw err
                res.json({
                    status: res.statusCode,
                    msg:"The user record was updated."
                })
            })
    }
    deleteUser(req,res){
        const query =
         `
        DELETE FROM Users
        WHERE userID = ${req.params.id};
        `
        db.query(query, (err) => {
            if(err) throw err
            res.json({
        status:res.statusCode,
        msg:'The user records were deleted.'
        })
        })
    }
}

module.exports = Users;