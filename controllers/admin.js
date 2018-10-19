const jwt = require('jsonwebtoken') // 用于签发、解析`token`
const model = require('../app/model');
const User = model.user;
const {
    comparePassword
} = require('./../lib/util/pwd') //加盐加密，加盐加密比较
class AdminController {

    //管理员登录
    static async login(ctx) {
        try {
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
                    code: 204,
                    message: '你不是管理员哦'
                }
            }
            if (userData) {
                const isMatch = await comparePassword(password, userData.password);
                console.log(isMatch)
                if (isMatch) {
                    const token = jwt.sign({
                        userName: userData.userName,
                        userId: userData.id,
                        authority: 1
                    }, 'jgchen', {
                        expiresIn: '24h'
                    });
                    ctx.body = {
                        code: 200,
                        token,
                        avatar: userData.avatar,
                        userName: userData.userName,
                        message: '登录成功'
                    }
                } else {
                    ctx.body = {
                        code: 203,
                        message: '密码不正确'
                    }
                }
            }
        } catch (error) {
            return ctx.body = {
                code: 500,
                message: error
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
            code: 200,
            data
        }
    }
    //修改管理员信息
    static async editAdminInfo(ctx) {
        try {
            const authority = +ctx.state.user.authority;
            const introduction = ctx.request.body.introduction;
            const id = +ctx.state.user.userId;
            console.log(ctx.state.user)
            const userData = await User.findOne({
                where: {
                    id,
                    authority
                },
                attributes: ['userName', 'introduction', 'avatar','id']
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
                ctx.status = 401
                return ctx.body = {
                    message: '你不是管理员，你没有权限,无法进行此项操作'
                }
            }
        } catch (error) {
            ctx.status = 500;
            throw (error)
        }

    }

}
module.exports = AdminController;