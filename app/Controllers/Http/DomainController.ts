import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import DomainValidation from 'App/Validators/DomainValidator'
import { doRequests } from 'App/Services/doRequests'

import Domain from 'App/Models/Domain'
import DomainTests from 'App/Models/DomainTests'
import User from 'App/Models/User'

export default class DomainController {
  public async renderNewDomain({ view }: HttpContextContract) {
    return view.render('newDomain')
  }

  public async newDomain({ request, response, session }: HttpContextContract) {
    await request.validate(DomainValidation)

    const { domain: domainName } = request.body()

    const existingDomain = await Domain.findBy('name', domainName)
    if (existingDomain) {
      session.flash('hasError', true)
      session.flash('errorMessage', 'This domain already have in DB')
      return response.redirect().back()
    }

    await Domain.create({
      name: domainName,
    })

    return response.redirect('/profile')
  }

  public async renderDomainDetails({ view, params }: HttpContextContract) {
    const { id: domainId } = params

    const domainTests = await DomainTests.query()
      .where('domainId', domainId)
      .preload('user')
      .preload('domain')

    const domain = await Domain.find(domainId)

    return view.render('domainDetails', {
      domain,
      domainTests,
    })
  }

  public async editDomain({ request, response, params }: HttpContextContract) {
    await request.validate(DomainValidation)
    const { id: domainId } = params
    const { domain: domainNewName } = request.body()

    const domain = await Domain.find(domainId)
    if (domain) {
      domain.name = domainNewName
      await domain.save()

      return response.redirect('/profile')
    }

    return '<h1>404 NOT FOUND</h1>'
  }

  public async deleteDomain({ response, params }: HttpContextContract) {
    const { id: domainId } = params
    const domain = await Domain.find(domainId)

    await domain?.delete()
    return response.redirect('/profile')
  }

  public async doRequests({ request, response, session }: HttpContextContract) {
    const { count: domainsCount } = request.body()

    if (domainsCount === '0') {
      return response.redirect().back()
    }

    const userId = session.get('userId')
    const userFromDb = await User.find(userId)

    if (userFromDb) {
      const allRequestsData = await doRequests(domainsCount, userFromDb)

      session.flash('testsData', allRequestsData)
      return response.redirect().back()
    }

    return '<h1>404 NOT FOUND</h1>'
  }
}
