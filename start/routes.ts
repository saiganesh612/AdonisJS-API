/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  // Feature table routes
  Route.group(() => {
    Route.get('/', 'HeadshotDB/FeaturesController.index')
    Route.post('/', 'HeadshotDB/FeaturesController.store')
    Route.get('/:id', 'HeadshotDB/FeaturesController.show').as('feature.show')
    Route.put('/:id', 'HeadshotDB/FeaturesController.update').as('feature.update')
    Route.delete('/:id', 'HeadshotDB/FeaturesController.destroy').as('feature.delete')
  })
    .prefix('features')
    .middleware('auth')

  // Auth Routes
  Route.group(() => {
    Route.post('/register', 'Auth/AuthController.register').as('auth.register')
    Route.post('/login', 'Auth/AuthController.login').as('auth.login')
    Route.get('/logout', 'Auth/AuthController.logout').as('auth.logout')
  }).prefix('/auth')
}).prefix('/api')
