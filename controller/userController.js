// database connection
const dbConnection = require('../db/dbConfig')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const {StatusCodes} = require('http-status-codes');

async function register(req,res){
    const{username,firstname,lastname,email,password} = req.body;
    if(!username || !firstname || !lastname || !email || !password){
      return res.status(StatusCodes.BAD_REQUEST).json({ msg:"please provide all required information" });
    }

    try {

      const[user]=await dbConnection.query("SELECT username,userid from users WHERE username=? or email=? ",[username,password])
          if(user.length>0){
           return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already existed"})
          }
          if(password.length<=8){
           return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 characters"})
          }


          // ecrypt the passeord
          const salt= await bcrypt.genSalt(10);

          const hashedPassword=await bcrypt.hash(password,salt)

        await dbConnection.query("INSERT INTO USERS (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",[username,firstname,lastname,email,hashedPassword])
        return res.status(StatusCodes.CREATED).json({msg:"user registerd successfully"})
    } catch (error) {
      console.log(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "something went wrong, try again later!" });
    }




}

async function login(req, res) {
    const{email,password} = req.body;
    if(!email || !password){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"please enter all the required fields"})
    }

    try {
      const [user] = await dbConnection.query(
        "SELECT username,userid,password from users WHERE email=? ",[email]);
        // return res.json({user:user});
        if(user===0){
          return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"})
        }

      // compare password
      const isMatch = await bcrypt.compare(password,user[0].password);
      if(!isMatch){
         return res
           .status(StatusCodes.BAD_REQUEST)
           .json({ msg: "invalid credential" });
      }
     
      const username = user[0].username;
      const userid = user[0].userid;

      const token = jwt.sign({username,userid},process.env.JWT_SECRET,{expiresIn:"1d"})

      return res.status(StatusCodes.OK).json({msg:"user login successfully",token})

    } catch (error) {
      console.log(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "something went wrong, try again later!" });
    }
}

async function checkUser(req, res) {
  const username=req.user.username;
  const userid=req.user.userid;
  res.status(StatusCodes.OK).json({msg:"valid user",username,userid})

}

module.exports={register,login,checkUser}