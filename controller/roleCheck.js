function roleCheck(requiredRole) {
    return (req, res, next) => {
        // console.log(req.user);
        const userRole = req.user.role;
        // console.log(userRole)
        if (userRole === requiredRole) {
            next();
        }
        else {
            res.json({ msg: 'access denied' })
        }
    }
}

module.exports = roleCheck;