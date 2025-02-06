import jwt from "jsonwebtoken"
const isAuthAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.admintoken;
        if (!token) {
            res.status(401).json({
                message: "Not Authenticated"
            })
        };
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        if (decode.role === "user") {
            return res.status(404).send("The Operation is not accessible");
        }
        if (!decode) {
            res.status(401).json({
                message: "Invalid TOKEN"
            })
        }
        console.log(token);
        req.id = decode.userId;
        next();
    }
    catch (error) {
        console.log(error);
    }
}

export default isAuthAdmin;