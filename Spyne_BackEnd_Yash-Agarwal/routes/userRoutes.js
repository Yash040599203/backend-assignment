const express = require('express');
const { createUser, updateUser, deleteUser, listUsers, searchUserByName, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', listUsers);
router.get('/search', searchUserByName);

module.exports = router;
