import jwt from 'jsonwebtoken';

const VerifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //Add decoded user data to req 
        
        return next(); 
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

export default VerifyToken;
