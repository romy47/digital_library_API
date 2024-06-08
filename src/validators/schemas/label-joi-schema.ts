import Joi from 'joi';

export const createLabelBodyValidatorSchema = Joi.object().keys({
    title: Joi.string().required(),
    documents: Joi.array().items(Joi.string()),
})
