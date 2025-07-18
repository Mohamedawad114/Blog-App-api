import joi from 'joi';

function validationsignup(obj){
    const schema=joi.object({
        name:joi.string().required().min(2).trim(),
        email: joi.string().email().required().trim(),
        user_name: joi.string().required().min(6).regex(/^[A-Za-z0-9@#&*_]+$/),
        password:joi.string().required().min(6).max(64),
        isAdmin:joi.boolean().default(false)
    })
    return schema.validate(obj)
}
function validationLogin(obj){
    const schema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().required().min(6).max(64)
    })
    return schema.validate(obj)
}
function validationupdate(obj){
    const schema=joi.object({
        name:joi.string().min(2),
        email: joi.string().email(),
        user_name: joi.string().regex(/^a-zA-Z0-9#@-_$/),
        password:joi.string().min(6).max(64).message(` password must be strong greater than 6`)
    })
    return schema.validate(obj)
}

export{validationLogin,validationsignup,validationupdate}