import Joi from 'joi';
import { updateDocumentValidatorSchema } from './document-joi-schema';
import { updateLabelBodyValidatorSchema } from './label-joi-schema';

export const createOrUpdateManyDocumentValidatorSchema = Joi.object().keys({
    documents: Joi.array().items(
        updateDocumentValidatorSchema
    ),
    labelAdd: updateLabelBodyValidatorSchema.allow(null),
    labelRemove: updateLabelBodyValidatorSchema.allow(null),
})
