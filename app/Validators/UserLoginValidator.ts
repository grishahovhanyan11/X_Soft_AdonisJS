import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class UserLoginValidation {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string(),
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required ',
    email: 'Invalid email format',
  }
}
