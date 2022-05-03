const validateFiels = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validatrRole = require('../middlewares/validate-roles');
const confirmPassword = require('../middlewares/validate-password');
const isEmailValidateUpdate = require('../middlewares/validate-email');

module.exports = {
    ...validateFiels,
    ...validateJWT,
    ...validatrRole,
    ...confirmPassword,
    ...isEmailValidateUpdate
}