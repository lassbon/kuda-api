const Joi = require('joi');

const schema = Joi.object({
    lastname: Joi.string().alphanum().min(2).max(30).required(),
    othernames: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password'),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})