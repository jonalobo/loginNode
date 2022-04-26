const {Router}= require('express');
const { check } = require('express-validator');

const { validateFiels } = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const { login } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'Add a valid email').isEmail(),
    check('password', 'Add a valid password').not().isEmpty(),
    validateFiels
],login);


module.exports = router;