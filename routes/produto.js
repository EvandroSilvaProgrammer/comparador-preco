const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Produto = require('../models/Produto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get produto list
router.get('/', (req, res) =>
    Produto.findAll()
        .then(produto => {
            res.render('produto', {
                produto
            });
        })
        .catch(err => console.log(err))
);

// Display add produto form
router.post('/add', (req, res) => res.render('add'));
// Add a Produto
router.post('/add', (req, res) => {

    let { descri_produ, img, preco, localizacao } = req.body;
    let errors = [];

    // Validate Fields
    if (!descri_produ) {
        errors.push({ text: 'Por favor entre com um produto' });
    }
    if (!preco) {
        errors.push({ text: 'Por favor entre com um reço' });
    }
    if (!localizacao) {
        errors.push({ text: 'Por favor entre com uma localização' });
    }

    if (errors.length > 0) {
        res.render('add', {
            errors,
            descri_produ,
            preco,
            localizacao,
        });
    } else {
        if (!preco) {
            preco = 'Unknown';
        } else {
            preco = `$${budget}`;
        }
    }
   
    //Insert into Table
    Produto.create({
        descri_produ,
        img,
        preco,
        localizacao
        })
            .then(produto => res.redirect('/produto'))
            .catch(err => console.log(err));
});

// Search for gigs
router.get('/search', (req, res) => {
    let { term } = req.query;
  
    // Make lowercase
    term = term.toLowerCase();
  
    Produto.findAll({ where: { descri_produ: { [Op.like]: '%' + term + '%' } } })
      .then(produto => res.render('produto', { produto }))
      .catch(err => res.render('error', {error: err}));
  });

module.exports = router;