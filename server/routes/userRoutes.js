const {Router} = require('express')
const {
    registerUser,
    loginUser,
    getUser,
    changeAvatar,
    getAuthors,
    editUser
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/edit-user', authMiddleware, editUser);
router.post('/change-avatar', authMiddleware, changeAvatar);
router.get('/:id', getUser);
router.get('/', getAuthors);


module.exports = router