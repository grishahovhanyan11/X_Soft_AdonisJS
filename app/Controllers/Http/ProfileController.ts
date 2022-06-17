import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Domain from 'App/Models/Domain'
import User from 'App/Models/User'

export default class ProfileController {
  public async renderProfilePage({ session, view }: HttpContextContract) {
    const userId = session.get('userId')
    if (!userId) {
      return '<h1>404 NOT FOUND</h1>'
    }

    const user = await User.find(userId)

    if (user) {
      const domains = await Domain.all()

      if (user.isAdmin) {
        return view.render('adminProfile', {
          userEmail: user.email,
          domains,
        })
      }

      if (user.isCron) {
        return view.render('cronProfile', {
          userEmail: user.email,
        })
      }
    }

    return '<h1>404 NOT FOUND</h1>'
  }

  public logout({ session, response }: HttpContextContract) {
    session.forget('userId')
    return response.redirect('/auth')
  }
}
