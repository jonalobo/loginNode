const {Router}= require('express');
const { check } = require('express-validator');

const {validateFiels,validateJWT,adminRole,haveRole,confirmPassword} = require('../middlewares');

const {usersGet, usersDelete, usersPut, usersPost, usersPatch} = require('../controllers/users');
const { isRoleValidate, isEmailValidate, exitIdForUser } = require('../helpers/db_validators');

const router = Router();

router.get('/', usersGet);
router.put('/:id', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(exitIdForUser),
    check('role').custom(isRoleValidate),
    validateFiels
], usersPut);
router.post('/',[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is not validate').isEmail(),
    check('email').custom(isEmailValidate),
    check('password', 'The password must be at least 6 characters').isLength({min:10}), 
    confirmPassword,
    check('role').custom(isRoleValidate),
    validateFiels
],usersPost);
router.delete('/:id', [
    validateJWT,
    adminRole,
    haveRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(exitIdForUser),
    validateFiels
],usersDelete);
router.patch('/', usersPatch);



module.exports = router;