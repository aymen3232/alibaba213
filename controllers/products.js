module.exports = function(app) {
    var products = app.models.products;
    var validacao = require('../config/validations/products');

    var productsController = {
        index: function(req, res) {
            products.find(function(err, dados) {
                if (err) {
                    req.flash('erro', "Erreur de chargement : " + err);
                    res.render('products/index', { lista: null });
                    return;
                }
                res.render('products/index', { lista: dados });
            });
        },

        register: function(req, res) {
            res.render('products/register', { model: new products() });
        },

        salvar: function(req, res) {
            if (validacao(req, res)) {
                var model = new products(req.body);
                model.name = req.body.name;
                model.block = false;

                // Ajout pour gérer l'upload de l'image
                if (req.file) {
                    model.image = {
                        url: req.file.path,
                        altText: 'Description de l\'image'
                    };
                }

                products.findOne({ 'name': model.name }, function(err, dados) {
                    if (err) {
                        req.flash('erro', "Erreur de chargement : " + err);
                        res.render('products/register', { model: model });
                        return;
                    }
                    model.save(function(err) {
                        if (err) {
                            req.flash('erro', "Erreur d'enregistrement : " + err);
                            res.render('products/register', { model: model });
                            return;
                        }
                        req.flash('info', "Produit enregistré avec succès !");
                        res.redirect('/products');
                    });
                });
            } else {
                res.render('products/register', { model: req.body });
            }
        },

        update: function(req, res) {
            console.log(req.file); // Ajouté pour afficher les détails du fichier
            if (validacao(req, res)) {
                products.findById(req.params.id, function(err, dados) {
                    var model = dados;
                    model.name = req.body.name;

                    // Vérifiez si une nouvelle image a été téléchargée
                    if (req.file) {
                        model.image.url = req.file.path;
                        model.image.altText = "Nouvelle description de l'image"; // Mettez à jour si nécessaire
                    }

                    model.save(function(err) {
                        if (err) {
                            req.flash('erro', "Erreur d'édition : " + err);
                            res.render('products/edit', { model: model });
                            return;
                        }
                        req.flash('info', "Produit mis à jour avec succès !");
                        res.redirect('/products');
                    });
                });
            } else {
                res.render('products/edit', { model: req.body });
            }
        },



        show: function(req, res) {
            products.findById(req.params.id, function(err, dados) {
                if (err) {
                    req.flash('erro', "Erreur de visualisation : " + err);
                    res.redirect('/products');
                    return;
                }
                res.render('products/profile', { model: dados });
            });
        },

        excluir: function(req, res) {
            products.remove({ _id: req.params.id }, function(err) {
                if (err) {
                    req.flash('erro', "Erreur de suppression : " + err);
                    res.redirect('/products');
                    return;
                }
                req.flash('info', "Produit supprimé avec succès !");
                res.redirect('/products');
            });
        },

        edit: function(req, res) {
            products.findById(req.params.id, function(err, dados) {
                if (err) {
                    req.flash('erro', "Erreur d'édition : " + err);
                    res.redirect('/products');
                    return;
                }
                res.render('products/edit', { model: dados });
            });
        },

        update: function(req, res) {
            if (validacao(req, res)) {
                products.findById(req.params.id, function(err, dados) {
                    var model = dados;
                    model.name = req.body.name;

                    model.save(function(err) {
                        if (err) {
                            req.flash('erro', "Erreur d'édition : " + err);
                            res.render('products/edit', { model: model });
                            return;
                        }
                        req.flash('info', "Produit mis à jour avec succès !");
                        res.redirect('/products');
                    });
                });
            } else {
                res.render('products/edit', { model: req.body });
            }
        }
    };

    return productsController;
};