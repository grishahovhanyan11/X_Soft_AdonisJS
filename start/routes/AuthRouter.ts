import AuthRoute from '@ioc:Adonis/Core/Route'

AuthRoute.group(() => {
  AuthRoute.get('/', 'AuthController.renderAuthPage')
  AuthRoute.post('/login', 'AuthController.login')
  AuthRoute.post('/register', 'AuthController.register')
}).prefix('/auth')
