import ProfileRoute from '@ioc:Adonis/Core/Route'

ProfileRoute.group(() => {
  ProfileRoute.get('/', 'ProfileController.renderProfilePage')
  ProfileRoute.get('/logout', 'ProfileController.logout')
}).prefix('/profile')
