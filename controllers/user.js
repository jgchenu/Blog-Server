const jwt = require('jsonwebtoken') // 用于签发、解析`token`
const {
    addSalt,
    comparePassword
} = require('./../lib/util/pwd') //加盐加密，加盐加密比较
const model = require('../model');
const User = model.user; //引入user的model

class UserController {
    static async login(ctx) {
        try {
            const {
                userName,
                password
            } = ctx.request.body;


            const userData = await User.findOne({
                where: {
                    userName
                }
            })
            console.log(JSON.stringify(userData))
            if (!userData) {
                return ctx.body = {
                    code: 204,
                    message: '用户不存在'
                }
            }
            if (userData) {
                const isMatch = await comparePassword(password, userData.password);
                console.log(isMatch)
                if (isMatch) {
                    const token = jwt.sign({
                        userName: userData.userName,
                        userId: userData.id
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
                        message: '用户名或者密码不正确'
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
    static async register(ctx) {
        try {
            const {
                userName,
                password
            } = ctx.request.body
            const checkData = await User.findOne({
                where: {
                    userName
                }
            })
            if (checkData !== null) {
                return ctx.body = {
                    code: 201,
                    message: '用户名已经存在'
                }
            }
            const saltPassword = await addSalt(password);
            const result = await User.create({
                userName,
                password: saltPassword
            })
            return result !== null ? ctx.body = {
                code: 200,
                message: '注册成功'
            } : ctx.body = {
                code: 202,
                message: '注册失败'
            }
        } catch (error) {
            ctx.status = 500;
            throw (error)
        }

    }
    static async getInfo(ctx) {
        try {
            const userId = ctx.state.user.userId;
            console.log(ctx.state.user)
            const userData = await User.findOne({
                where: {
                    id: userId
                },
                attributes: {
                    exclude: ['password']
                }
            })
            return ctx.body = {
                code: 200,
                data: userData,

            }
        } catch (error) {
            ctx.status = 500;
            throw (error)
        }
    }
}
module.exports = UserController