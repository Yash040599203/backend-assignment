const express = require('express');
const { createDiscussion, updateDiscussion, deleteDiscussion, listDiscussionsByTags, listDiscussionsByText, viewDiscussion } = require('../controllers/discussionController');

const router = express.Router();

router.post('/', createDiscussion);
router.put('/:id', updateDiscussion);
router.delete('/:id', deleteDiscussion);
router.get('/tags', listDiscussionsByTags);
router.get('/search', listDiscussionsByText);
router.get('/:id', viewDiscussion);

module.exports = router;
