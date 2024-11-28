const express = require('express');
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');

const promotionRouter = express.Router();

promotionRouter
    .route('/')
    .get((req, res, next) => {
        Promotion.find()
            .then(promotions => res.json(promotions))
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotion.create(req.body)
            .then(promotion => res.json(promotion))
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotion.deleteMany()
            .then(response => res.json(response))
            .catch(err => next(err));
    });

promotionRouter
    .route('/:promotionId')
    .get((req, res, next) => {
        Promotion.findById(req.params.promotionId)
            .then(promotion => res.json(promotion))
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotion.findByIdAndUpdate(req.params.promotionId, { $set: req.body }, { new: true })
            .then(promotion => res.json(promotion))
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotion.findByIdAndDelete(req.params.promotionId)
            .then(response => res.json(response))
            .catch(err => next(err));
    });

module.exports = promotionRouter;
