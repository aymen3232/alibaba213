var mongoose = require('mongoose');

module.exports = function() {
    var imageSchema = mongoose.Schema({
        url: { type: String, trim: true },
        altText: { type: String, trim: true }
    });

    var productsSchema = mongoose.Schema({
        name: { type: String, required: true, trim: true },
        block: { type: Boolean, required: true },
        image: imageSchema, // Modifié ici pour utiliser le schéma d'image
        data_cad: { type: Date, default: Date.now }
    });

    return mongoose.model('products', productsSchema);
};