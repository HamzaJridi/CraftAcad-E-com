//Panier

'use strict';
//déclaration du service
app.service('Panier', [function(){
    //déclaration d'un tableau panier vide
    this.panier = [];

    //finction pour ajouter un produit
    this.addProduct= function(val, qte){
        this.panier.push({"prod": val, "qte": qte});
    }
    //fonction supprimer un produit
    this.removeProduct = function(){
        this.panier.splice(index, 1);
    }
    //fonction pour mettre à jour un produit
    this.updateProduct = function(){
        // this.
    }

}]);