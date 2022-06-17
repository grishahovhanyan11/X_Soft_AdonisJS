import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class NewUserValidation {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string([rules.minLength(6), rules.maxLength(25)]),
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required ',
    email: 'Invalid email format',
    'password.minLength': 'Password must contain min 6 and max 25 symbols.',
    'password.maxLength': 'Password must contain min 6 and max 25 symbols.',
  }
}
