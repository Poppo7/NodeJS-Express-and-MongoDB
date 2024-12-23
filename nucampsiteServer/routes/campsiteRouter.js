const express = require('express');
const Campsite = require('../models/campsite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const campsiteRouter = express.Router();

/* do cross-origin */

// Utility function for error handling
function handleNotFound(res, next, entity, message) {
    if (!entity) {
        const err = new Error(message);
        err.status = 404;
        return next(err);
    }
    return entity;
}

campsiteRouter
    .route('/:campsiteId/comments/:commentId')
    .put(authenticate.verifyUser, (req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                const comment = campsite?.comments.id(req.params.commentId);
                if (handleNotFound(res, next, comment, `Comment ${req.params.commentId} not found`)) {
                    // Ensure only the author can update their comment
                    if (!comment.author.equals(req.user._id)) {
                        const err = new Error('You are not authorized to update this comment!');
                        err.status = 403;
                        return next(err);
                    }
                    if (req.body.rating) comment.rating = req.body.rating;
                    if (req.body.text) comment.text = req.body.text;
                    return campsite.save();
                }
            })
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Campsite.findById(req.params.campsiteId)
            .then(campsite => {
                const comment = campsite?.comments.id(req.params.commentId);
                if (handleNotFound(res, next, comment, `Comment ${req.params.commentId} not found`)) {
                    // Ensure only the author can delete their comment
                    if (!comment.author.equals(req.user._id)) {
                        const err = new Error('You are not authorized to delete this comment!');
                        err.status = 403;
                        return next(err);
                    }
                    comment.remove();
                    return campsite.save();
                }
            })
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
    });

module.exports = campsiteRouter;
