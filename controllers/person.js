const model = require('../model');
const User = model.user;

exports.getPerson = async (ctx) => {
    const data = await User.findOne({
        where: {
            id: 1,
            authority: 1
        },
        attributes: {
            exclude: ['password']
        }
    })
    ctx.body = {
        code: 200,
        data
    }
}