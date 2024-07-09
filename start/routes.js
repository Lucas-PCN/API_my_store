'use strict'

const Route = use('@adonisjs/framework/src/Route/Manager')

Route.get('/', () => {
  return { greeting: 'Hello World: BeMobile - Desafio Backend' }
})
  
Route.post('signup', 'UserController.register')
Route.post('login', 'UserController.login')
