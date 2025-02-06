import jwt from "jsonwebtoken"
const isAuthenticated = async (req, res, next) => {
    try {
        console.log(req.body.type);
        var token;
        if (req.body.type === "Web") {
            token = req.rawHeaders[9]
        }
        else {
            token = req.cookies.token;
        }
        if (!token) {
            res.status(401).json({
                message: "Not Authenticated"
            })
        };
        console.log(token);
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        // console.log("decode" + decode);
        if (!decode) {
            res.status(401).json({
                message: "Invalid TOKEN"
            })
        }
        // console.log("token" + token);
        req.id = decode.userId;
        next();
    }
    catch (error) {
        console.log("some error");
    }
}

export default isAuthenticated;