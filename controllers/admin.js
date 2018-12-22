const jwt = require('jsonwebtoken') // 用于签发、解析`token`
const model = require('../app/model');
const User = model.user;
const {
    comparePassword
} = require('./../lib/util/pwd') //加盐加密，加盐加密比较
class AdminController {

    //管理员登录
    static async login(ctx) {
        const {
            userName,
            password
        } = ctx.request.body;
        const userData = await User.findOne({
            where: {
                userName,
                authority: 1
            }
        })
        if (!userData) {
            return ctx.body = {
                code: 1,
                message: '你不是管理员哦'
            }
        }
        if (userData) {
            const isMatch = await comparePassword(password, userData.password);
            if (isMatch) {
                const token = jwt.sign({
                    userName: userData.userName,
                    userId: userData.id,
                    authority: 1
                }, 'jgchen', {
                    expiresIn: '24h'
                });
                ctx.body = {
                    code: 0,
                    token,
                    avatar: userData.avatar,
                    userName: userData.userName,
                    message: '登录成功'
                }
            } else {
                ctx.body = {
                    code: 1,
                    message: '密码不正确'
                }
            }
        }
    }
    //获取管理员信息
    static async getAdminInfo(ctx) {
        const data = await User.findOne({
            where: {
                authority: 1
            },
            attributes: ['userName', 'introduction', 'avatar']
        })
        ctx.body = {
            code: 0,
            data
        }
    }
    //修改管理员信息
    static async editAdminInfo(ctx) {
        const authority = +ctx.state.user.authority;
        const introduction = ctx.request.body.introduction;
        const id = +ctx.state.user.userId;
        const userData = await User.findOne({
            where: {
                id,
                authority
            },
            attributes: ['userName', 'introduction', 'avatar', 'id']
        })
        if (userData) {
            userData.introduction = introduction;
            const updateData = await userData.save();
            return ctx.body = {
                code: 0,
                message: '修改成功',
                data: updateData
            }
        } else {
            ctx.status = 401
            return ctx.body = {
                message: '你不是管理员，你没有权限,无法进行此项操作'
            }
        }
    }
}
module.exports = AdminController;