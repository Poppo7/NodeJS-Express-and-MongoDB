const express = require('express');
const Partner = require('../models/partner');

const partnerRouter = express.Router();

partnerRouter.route('/')
    .get((req, res, next) => {
        Partner.find()
            .then(partners => res.json(partners))
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        Partner.create(req.body)
            .then(partner => res.json(partner))
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /partners');
    })
    .delete((req, res, next) => {
        Partner.deleteMany()
            .then(response => res.json(response))
            .catch(err => next(err));
    });

partnerRouter.route('/:partnerId')
    .get((req, res, next) => {
        Partner.findById(req.params.partnerId)
            .then(partner => {
                if (partner) res.json(partner);
                else {
                    res.statusCode = 404;
                    res.end('Partner not found');
                }
            })
            .catch(err => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
    })
    .put((req, res, next) => {
        Partner.findByIdAndUpdate(req.params.partnerId, { $set: req.body }, { new: true })
            .then(updatedPartner => res.json(updatedPartner))
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Partner.findByIdAndDelete(req.params.partnerId)
            .then(response => res.json(response))
            .catch(err => next(err));
    });

module.exports = partnerRouter;
