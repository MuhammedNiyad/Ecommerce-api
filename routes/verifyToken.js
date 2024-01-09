const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=> {
    // console.log("step -1");
    const authHeader = req.headers.token
    console.log(
        { authHeader }
    );
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err){
                res.status(403).json(" Token is not valid..!");
            }
            req.user = user;
            next();
        });
    }else{
        return res.status(401).json(" You are not authenticated..!");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    
    verifyToken(req, res, (user) => {
        // console.log("step 2");
        if (req.user.id || req.user.isAdmin) {
            
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

  //Admin token varification..!
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };