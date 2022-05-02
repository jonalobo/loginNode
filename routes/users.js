const {Router}= require('express');
const { check } = require('express-validator');

const {validateFiels,validateJWT,adminRole,haveRole,confirmPassword} = require('../middlewares');

const {usersGet, usersDelete, usersPut, usersPost, userGet} = require('../controllers/users');
const { isRoleValidate, isEmailValidate, exitIdForUser, isEmailValidateUpdate} = require('../helpers/db_validators');

const router = Router();

router.get('/', usersGet);
router.get('/:id',[
    check('id', 'It is not a valid ID').isNumeric().notEmpty(),
    exitIdForUser,
    validateFiels
],
userGet);
router.put('/:id', [
    check('id', 'It is not a valid ID').isNumeric().notEmpty(),
    exitIdForUser,
    check('name', 'The name is required').not().isEmpty(),
    check('lastname', 'The name is required').not().isEmpty(),
    check('email', 'The email is not validate').isEmail(),
    isEmailValidateUpdate,
    check('password', 'The password must be at least 10 characters').isLength({min:10}), 
    confirmPassword,
    check('nui', 'The NUI is required').not().isEmpty(),
    check('phone', 'The phone number is not correct').isLength({max:10}),
    isRoleValidate,
    validateFiels
], usersPut);
router.post('/',[
    check('name', 'The name is required').not().isEmpty(),
    check('lastname', 'The name is required').not().isEmpty(),
    check('email', 'The email is not validate').isEmail(),
    isEmailValidate,
    check('password', 'The password must be at least 10 characters').isLength({min:10}), 
    confirmPassword,
    check('nui', 'The NUI is required').not().isEmpty(),
    check('phone', 'The phone number is not correct').isLength({max:10}),
    isRoleValidate,
    validateFiels
],usersPost);
router.delete('/:id', [
    //validateJWT,
    //adminRole,
    //haveRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'It is not a valid ID').isNumeric().notEmpty(),
    exitIdForUser,
    validateFiels
],usersDelete);


module.exports = router;