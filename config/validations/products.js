var path = require('path');

module.exports = function(req, res) {
    // Log pour voir les données reçues
    console.log("Données reçues:", req.body);

    req.assert('name', 'Nom du produit invalide').notEmpty();

    // Validation de l'image
    if (req.file) {
        var fileTypes = /jpeg|jpg|png/;
        var extname = fileTypes.test(path.extname(req.file.originalname).toLowerCase());
        var mimeType = fileTypes.test(req.file.mimetype);

        if (!extname || !mimeType) {
            req.flash('erro', 'Type de fichier non supporté');
        }
    } else {
        // Condition pour vérifier si c'est une création ou une modification
        if (!req.body.id && req.route.path === '/products/register') {
            req.flash('erro', 'Image requise');
        }
    }

    var validateErros = req.validationErrors() || [];

    // Log pour voir les erreurs de validation
    console.log("Erreurs de validation:", validateErros);

    if (validateErros.length > 0) {
        validateErros.forEach(function(e) {
            req.flash('erro', e.msg);
        });
        return false;
    } else {
        return true;
    }
};