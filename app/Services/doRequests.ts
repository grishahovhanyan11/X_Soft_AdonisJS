import axios from 'axios'

import User from 'App/Models/User'
import Domain from 'App/Models/Domain'
import DomainTests from 'App/Models/DomainTests'
import randomDomain from 'App/../utils/randomDomain'

interface ResponseObject {
  status: number
  statusText: string
  userId: number
  domainId: number
  url: string
}

export async function doRequests(count: number, user: User) {
  const allRequestsData: ResponseObject[] = []

  // Fill array from 0 to domainsCount
  const domainsFromDb = await Domain.query()
    .limit(count * 3)
    .select('name', 'id')

  for (let i = 0; i < count; i++) {
    if (domainsFromDb.length <= 0) {
      break
    }

    // get random domain
    const domain = randomDomain(domainsFromDb)

    let data: any = {}
    await axios
      .options(domain.name)
      .then((response) => {
        data = {
          status: response.status,
          statusText: response.statusText,
          userId: user.id,
          domainId: domain.id,
        }
      })
      .catch((error) => {
        data = {
          status: error.response.status,
          statusText: error.response.statusText,
          userId: user.id,
          domainId: domain.id,
        }
      })

    await DomainTests.create(data)

    allRequestsData.push({ ...data, url: domain.name })
  }

  return allRequestsData
}
