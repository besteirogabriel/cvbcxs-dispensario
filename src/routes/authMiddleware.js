const jwt = require('jsonwebtoken');

//verifica token de autenticação
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if(!token) { //se não encontrar o token no headers
        return res.status(403).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, req.user.secretKey, (error, decoded) => {
        if(error) {
            return res.status(401).json({ message: "Token Inválido" });
        }

        req.email = decoded.email;
        next();
    });
}

module.exports = verifyToken;