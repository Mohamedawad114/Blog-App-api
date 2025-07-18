import joi from 'joi'

function validationcreate(obj){
    const schema=joi.object({
        name:joi.string().required().trim(),
        userId: joi.number().required(),
    })
    return schema.validate(obj)
}
function validationupdate(obj){
    const schema=joi.object({
        name:joi.string().required().trim(),
})
 return schema.validate(obj)
}



export{ validationcreate,validationupdate}