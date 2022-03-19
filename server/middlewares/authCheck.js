module.exports = async (req, res, next) => {
    try {
        const user = res.locals.user;

        if (!user) throw new Error('Unauthenticated');

        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Unauthenticated' });
    }
};
