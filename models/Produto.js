const Sequelize = require('sequelize');
const db = require('../config/database');

const Produto = db.define('produto', {
    descri_produ:{
       type: Sequelize.STRING
   },
   img:{
       type: Sequelize.STRING
   },
   //Empresa Referenciada
   preco:{
       type: Sequelize.DECIMAL
   },
   localizacao:{
    type: Sequelize.STRING
},
})

module.exports = Produto;