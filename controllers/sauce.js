const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({
            message: 'Sauce enregistré !'
        }))
        .catch(error => res.status(400).json({
            error
        }))
};

exports.modifySauce = (req, res, next) => {
    const supprImg = Sauce.findOne({
        _id: req.params.id
    })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({
                    imageUrl: req.body.imageUrl
                })
                .catch(error => res.status(400).json({
                    error
                }));
        });
    })
    .catch(error => res.status(500).json({
        error
    }));
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        supprImg,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    Sauce.updateOne({
            _id: req.params.id
        }, {
            ...sauceObject,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Sauce modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({
            error
        }))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({
            error
        }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Sauce supprimé !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            });
        })
        .catch(error => res.status(500).json({
            error
        }));
};

// Amélioration : changer structure objet sauce pour faire qu'un tableau avec clé userId et valeur vrai/faux avec vrai = like faux = dislike

function checkLike (userId, likeArray) {
    for (let userLiked of likeArray) { // Pour chaque user du tableau usersLiked
        if (userId == userLiked) { // Si user est présent usersLiked
            return true
            break;
        } else {
            return false;
        }
    }
}

function checkDislike (userId, dislikeArray) {
    for (let userLiked of dislikeArray) { // Pour chaque user du tableau usersLiked
        if (userId == userLiked) { // Si user est présent usersLiked
            return true
            break;
        } else {
            return false;
        }
    }
}

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            const sauceUsersLiked = sauce.usersLiked;
            const sauceUsersDisliked = sauce.usersDisliked;
            const user = req.body.userId;
            const like = req.body.like;

            switch (like) {
                case 1: // LIKE
                        Sauce.updateOne( { _id: req.params.id }, { $inc:{ likes:1 }, $push:{ usersLiked: user } } )
                        .then(()=>{res.status(200).json({ message : 'Vous avez aimé la sauce !'})})
                        .catch(error => res.status(500).json({ error }));
                    break;
                case 0: // Unlike / Undislike 
                    if(checkLike(user, sauceUsersLiked) == true){
                        Sauce.updateOne( { _id: req.params.id }, { $inc:{ likes:-1 }, $pull:{ usersLiked: user } } )
                        .then(()=>{res.status(200).json({ message : "Vous n'aimez plus la sauce !"})})
                        .catch(error => res.status(500).json({ error }));
                    } else if (checkDislike(user, sauceUsersDisliked) == true){
                        Sauce.updateOne( { _id: req.params.id }, { $inc:{ dislikes:-1 }, $pull:{ usersDisliked: user } } )
                        .then(()=>{res.status(200).json({ message : 'Vous ne detestez plus la sauce !'})})
                        .catch(error => res.status(500).json({ error }));
                    }            
                    break;
                case -1: // dislike
                    Sauce.updateOne( { _id: req.params.id }, { $inc:{ dislikes:1 }, $push:{ usersDisliked: user } } )
                    .then(()=>{res.status(200).json({ message : "Vous n'avez pas aimé la sauce !"})})
                    .catch(error => res.status(500).json({ error }));
                    break;
            }
        })
        .catch(error => res.status(500).json({
            error
        }));
};