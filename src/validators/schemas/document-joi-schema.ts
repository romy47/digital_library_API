import Joi from 'joi';

export const saveDocumentValidatorSchema = Joi.object().keys({

    linkText: Joi.string().allow(null, ''),
    language: Joi.string().allow(null, ''),
    publisher: Joi.string().allow(null, ''),
    allIdentifiers: Joi.array().items(Joi.string()),
    peerReviewed: Joi.boolean(),
    openAccess: Joi.boolean(),
    isFocused: Joi.boolean(),
    type: Joi.string().required(),
    isSaved: Joi.boolean(),
    labels: Joi.array().items(Joi.string()),
    id: Joi.string().required(),
    title: Joi.string().required(),
    doi: Joi.string().allow(null, ''),
    issn: Joi.string().allow(null, ''),
    creationDate: Joi.string().allow(null, ''),
    source: Joi.string().allow(null, ''),
    secondarySource: Joi.string().allow(null, ''),
    snippet: Joi.string().allow(null, ''),
    identifier: Joi.string().allow(null, ''),
    description: Joi.string().allow(null, ''),
    facets: Joi.object({
        topics: Joi.array().items({
            text: Joi.string().required(),
            count: Joi.number()
        }),
        contributors: Joi.array().items({
            text: Joi.string().required(),
            count: Joi.number()
        }),
        journalTitles: Joi.array().items({
            text: Joi.string().required(),
            count: Joi.number()
        }),
        resourceTypes: Joi.array().items({
            text: Joi.string().required(),
            count: Joi.number()
        }),
    }),
    rawObject: Joi.object(),
    page: Joi.number(),
})
