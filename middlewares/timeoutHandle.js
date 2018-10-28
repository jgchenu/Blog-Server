module.exports = async (ctx, next) => {
    ctx.req.setTimeout(120000);
    ctx.res.setTimeout(120000);
    await next();
}