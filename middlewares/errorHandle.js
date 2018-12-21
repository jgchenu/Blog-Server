const {
    logger
} = require('../logger');
module.exports = (ctx, next) => {
    return next().catch((err) => {
        logger.error(err);
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                ok: false,
                message: err.originalError ? err.originalError.message : err.message
            }
        } else {
            throw err;
        }
    });
}