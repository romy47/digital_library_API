import Joi from 'joi';

export const baseLabelBodyValidatorSchema = Joi.object().keys({
    title: Joi.string().required(),
    documents: Joi.array().items(Joi.string()),
})

export const updateLabelBodyValidatorSchema = baseLabelBodyValidatorSchema.keys({
    _id: Joi.string().allow(null, ''),
})

