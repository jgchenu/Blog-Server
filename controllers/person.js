const model = require('../model');
const User = model.user;

//获取个人信息
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
//修改个人信息
exports.editPerson = async (ctx) => {
    const introduction = ctx.request.body.introduction;
    const data = await User.update({
        introduction,
        fields: ['introduction']
    }, {
        where: {
            id: 1,
            authority: 1
        }
    })
    ctx.body = {
        code: 200,
        data
    }
}