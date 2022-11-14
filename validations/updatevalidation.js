

const Joi = require('joi')



const updateValidation = (data) => {

  const schema = Joi.object({

      title: Joi.string(),
      lastname : Joi.string(),
      othernames : Joi.string(),
      gender:Joi.string(),
      house_number: Joi.string(),
      street: Joi.string(),
      landmark: Joi.string(),
      local_govt: Joi.string(),
      dob: Joi.string(),
      country: Joi.string(),
      state_origin : Joi.string(),
      local_govt_origin:Joi.string(),
      means_of_id: Joi.string(),
      means_of_id_number: Joi.string(),
      marital_status : Joi.string()


  })

return  schema.validate(data);

}





module.exports = { updateValidation }