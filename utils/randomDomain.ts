interface Domain {
  name: string
  id: number
}

export default function randomDomain(domainsArray: Domain[]): Domain {
  const domain = domainsArray[Math.floor(Math.random() * domainsArray.length)]

  const indexOfDomain = domainsArray.indexOf(domain)
  domainsArray.splice(indexOfDomain, 1)

  return domain
}
