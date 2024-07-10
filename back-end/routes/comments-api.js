const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/comments');

//get comments
router.get('/', (req, res) => {
  userQueries.getCommentsByUserId(req.query.userId)
    .then(messages => {
      res.render('comments', {messages: messages, user: req.session.userId}); 
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});


//add comment
router.post('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect('/login');
    return res.send({message: 'You must be logged in to add a comment'});
  }

  const comment = req.body.comment;
  const recipeId = req.body.recipeId;
  const ownerId = req.body.ownerId;
  userQueries.addComment(comment, recipeId, ownerId)
    .then(() => {
      res.redirect(`/recipes/${recipeId}`);
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

//delete comment
router.post('/delete', (req, res) => {
  const ownerId = req.body.ownerId;
  const commentId = req.body.commentId;

  userQueries.deleteComment(ownerId, commentId)
    .then(() => {
      res.redirect('/comments');
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;