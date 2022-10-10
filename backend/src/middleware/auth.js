import jwt from 'jsonwebtoken';

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, 'lifesucks');
        const decoded = jwt.decode(token, {complete:true});
        req.userid = decoded.payload.userid;
        next();
    }catch(error){
        res.status(401).send(error.message);
    }
}

export default auth;