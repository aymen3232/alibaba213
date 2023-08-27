// Importation de multer pour la gestion des fichiers
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/'); // Dossier de destination pour les fichiers uploadés
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nom du fichier
    }
});
var upload = multer({ storage: storage });

// Exportation du module de routes
module.exports = function(app) {
    // Importation du contrôleur de produits
    var products = app.controllers.products;

    // Route pour afficher la liste des produits
    app.route('/products').get(products.index);

    // Routes pour l'enregistrement des produits
    app.route('/products/register')
        .get(products.register) // Page d'enregistrement
        .post(upload.single('image'), products.salvar); // Sauvegarde du produit

    // Route pour afficher le profil d'un produit
    app.route('/products/profile/:id').get(products.show);

    // Route pour supprimer un produit
    app.route('/products/delete/:id').post(products.excluir);

    // Routes pour l'édition des produits
    app.route('/products/edit/:id')
        .get(products.edit) // Page d'édition
        .post(upload.single('image'), products.update); // Mise à jour du produit
};