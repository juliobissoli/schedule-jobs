import * as Joi from 'joi';

export class CreateJobDto {
  collaborator: string;
  journey: string;
  startDate: string;
  daily: boolean;
  hour: number;
  status?: string
}


export const CreateJobDtoValidator = Joi.object({
  collaborator: Joi.string().required().messages({
    'string.base': 'O colaborador deve ser uma string válida.',
    'string.empty': 'O colaborador não pode estar vazio.',
    'any.required': 'O colaborador é obrigatório.',
  }),

  journey: Joi.string().required().messages({
    'string.base': 'A jornada deve ser uma string válida.',
    'string.empty': 'A jornada não pode estar vazia.',
    'any.required': 'A jornada é obrigatória.',
  }),

  startDate: Joi.string().isoDate().required().messages({
    'string.base': 'A data de início deve ser uma string válida.',
    'string.empty': 'A data de início não pode estar vazia.',
    'string.isoDate': 'A data de início deve estar no formato ISO (YYYY-MM-DD).',
    'any.required': 'A data de início é obrigatória.',
  }),

  daily: Joi.boolean().required().messages({
    'boolean.base': 'O campo "daily" deve ser um booleano.',
    'any.required': 'O campo "daily" é obrigatório.',
  }),


  hour: Joi.number().integer().min(0).max(23).required().messages({
    'number.base': 'A hora deve ser um número.',
    'number.integer': 'A hora deve ser um número inteiro.',
    'number.min': 'A hora deve ser maior ou igual a 0.',
    'number.max': 'A hora deve ser menor ou igual a 23.',
    'any.required': 'A hora é obrigatória.',
  }),
});