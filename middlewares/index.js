const validateFiels = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validatrRole = require('../middlewares/validate-roles');
const confirmPassword = require('../middlewares/validate-password');

module.exports = {
    ...validateFiels,
    ...validateJWT,
    ...validatrRole,
    ...confirmPassword
}