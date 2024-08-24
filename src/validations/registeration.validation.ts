import Joi from 'joi';


const registrationSchema = Joi.object({
    user: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirm_password: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match'
        }),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        title: Joi.string().required(),

      
          address:  Joi.object({
                address: Joi.string().required(),
                cityId: Joi.number().integer().required(),
                countryId: Joi.number().integer().required(),
            }).required()
      
    }).required(),
    
    company: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        details: Joi.object({
            website: Joi.string().uri().required(),
            industry: Joi.string().required(),
            foundingYear: Joi.string().required(),
            revenue: Joi.number().integer().required(),
            grossProfit: Joi.number().integer().required(),
            previousYearGrossProfit: Joi.number().integer().required(),
            ebitda: Joi.number().integer().required(),
            ebitdaPreviousYear: Joi.number().integer().required(),
        }).required(),
        teams: Joi.array().items(
            Joi.object({
                fullName: Joi.string().required(),
                roleId: Joi.number().integer().required(),
            })
        ).optional(),
    }).required()
});

export default registrationSchema;
