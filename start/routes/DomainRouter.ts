import DomainRoute from '@ioc:Adonis/Core/Route'

DomainRoute.group(() => {
  DomainRoute.get('/', 'DomainController.renderNewDomain')
  DomainRoute.post('/', 'DomainController.newDomain')
  DomainRoute.get('/:id', 'DomainController.renderDomainDetails')
  DomainRoute.put('/:id', 'DomainController.editDomain')
  DomainRoute.delete('/:id', 'DomainController.deleteDomain')
  DomainRoute.post('/request', 'DomainController.doRequests')
}).prefix('/domains')
