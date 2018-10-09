const model = require('../model');
const fs = require('fs')
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
exports.editAvatar = async (ctx) => {
    const file = ctx.request.files.avatar; // 获取上传文件
    const reader = fs.createReadStream(file.path); // 创建可读流
    const ext = file.name.split('.').pop(); // 获取上传文件扩展名
    const uploadUrl = `upload/${Math.random().toString()}.${ext}`;
    const upStream = fs.createWriteStream(`static/${uploadUrl}`); // 创建可写流
    reader.pipe(upStream); // 可读流通过管道写入可写流
    const avartarUrl = `http://localhost:8000/${uploadUrl}`
    const data = await User.update({
        avatar: avartarUrl,
        fields: ['avatar']
    }, {
        where: {
            id: 1,
            authority: 1
        }
    })
    ctx.body = {
        code: 200,
        data,
        avartar: avartarUrl
    }
}