exports.IsAdmin = async (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    }else{
        return res.status(401).send("Forbidden! You are Not admin")
    }
}
exports.IsKasir = async (req, res, next) => {
    if (req.user.role === "kasir") {
        next();
    }else{
        return res.status(401).send("Forbidden! You are Not kasir ");
    }
}
exports.IsOwner = async (req, res, next) => {
    if (req.user.role === "owner") {
        next();
    }else{
        return res.status(401).send("Forbidden! You are Not owner ");
    }
}
exports.IsAdminKasir = async (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "kasir") {
        next();
    }else{
        return res.status(401).send("Forbidden! You are Not Admin or Kasir");
    }
}