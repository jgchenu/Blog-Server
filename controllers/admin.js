const model = require('../app/model');
const User = model.user;

class AdminController {
    //获取管理员信息
    static async getAdminInfo(ctx) {
        const data = await User.findOne({
            where: {
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
    //修改管理员信息
    static async editAdminInfo(ctx) {
        const id = ctx.state.userId;
        const introduction = ctx.request.body.introduction;
        const userData = await User.findOne({
            where: {
                id,
                authority: 1
            },
            attributes: {
                exclude: ['password']
            }
        })
        if (userData) {
            userData.introduction = introduction;
            const updateData = await userData.save();
            return ctx.body = {
                code: 200,
                message: '修改成功',
                data: updateData
            }
        } else {
            return ctx.body = {
                code: 201,
                message: '你不是管理员，你没有权限'
            }
        }
    }

}
module.exports = AdminController;