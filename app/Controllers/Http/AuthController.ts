import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Password from 'App/../utils/password'
import NewUserValidation from 'App/Validators/NewUserValidator'
import UserLoginValidation from 'App/Validators/UserLoginValidator'

import User from 'App/Models/User'

export default class AuthController {
  public renderAuthPage({ view }: HttpContextContract) {
    return view.render('auth')
  }

  public async login({ request, response, session }: HttpContextContract) {
    session.flash('loginPage', true)
    await request.validate(UserLoginValidation)

    const { email, password } = request.body()

    const userFromDb = await User.findBy('email', email)
    if (!userFromDb) {
      session.flash('hasError', true)
      session.flash('errorMessage', 'No user with such email.')
      return response.redirect().back()
    }

    const isPasswordCorrect = await Password.compare(
      password,
      userFromDb.password
    )
    if (!isPasswordCorrect) {
      session.flash('hasError', true)
      session.flash('errorMessage', 'Incorrect password')
      return response.redirect().back()
    }

    session.put('userId', userFromDb.id)
    return response.redirect('/profile')
  }

  public async register({ request, response, session }: HttpContextContract) {
    session.flash('registerPage', true)
    await request.validate(NewUserValidation)

    const { email, password } = request.body()

    const userFromDb = await User.findBy('email', email)
    if (userFromDb) {
      session.flash('hasError', true)
      session.flash('errorMessage', 'User with such email already exist.')
      return response.redirect().back()
    }

    const hashedPassword = await Password.hash(password)
    await User.create({
      email,
      password: hashedPassword,
    })

    session.flash('success', true)
    session.flash('successMessage', 'Registration success.')
    return response.redirect().back()
  }
}
