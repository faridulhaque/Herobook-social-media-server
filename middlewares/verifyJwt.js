import jwt from "jsonwebtoken";
const verifyJwt = async (req, res, next) => {
    try {
        let header = await req.header("Authorization")
        if(!header){
            return res.status(400).json({message: "Something went wrong"})
        }
        else{
            const token= header.split(" ")[1] 
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user= verifyToken;
            
            // res.status()

            next()
        }

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export default verifyJwt