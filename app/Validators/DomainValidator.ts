import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class NewUserValidation {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    domain: schema.string([
      rules.regex(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      ),
    ]),
  })

  public messages: CustomMessages = {
    required: 'Please enter domain URL',
    regex: 'Invalid domain format',
  }
}
