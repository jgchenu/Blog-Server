const model = require('./model')
model.sequelize.sync({
    force: true
}).done(() => {
    console.log('wait for one minute and ctrl c to exit ');
})