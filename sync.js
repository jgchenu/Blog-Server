const model =require('./model')
model.sequelize.sync().done(()=>{
    console.log('wait for one minute and ctrl c to exit ');
})