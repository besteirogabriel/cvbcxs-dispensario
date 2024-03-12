const jwt = require('jsonwebtoken');

//verifica token de autenticação
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    const secretKey = req.cookies.secretKey;

    if(!token) { //se não encontrar o token no headers
        return res.status(403).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, secretKey, (error, decoded) => {
        if(error) {
            return res.status(401).json({ message: "Token Inválido" });
        }
        
        req.user = { email: decoded.email, id: decoded.id };

        next();
    });
}

module.exports = verifyToken;