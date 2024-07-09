'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')
const Hash = use('Hash')

class UserController {
  async register ({ request, response }) {
    const newUserSchema = {
      email: 'required|email|unique:users,email',
      password: 'required|min:9'
    }

    const validation = await validate(request.all(), newUserSchema)

    if (validation.fails()) {
      return response.status(400).send(validation.messages()[0].message)
    }
    
    const data = request.only(['username', 'email', 'password'])
    data.password = await Hash.make(data.password)

    const dataBaseUser = await User.query()
    .where('email', data.email)
    .orWhere('username', data.username)
    .first()

    if (dataBaseUser) {
      const alreadyInField = dataBaseUser.email === data.email ? 'email' : 'username'
      return response.status(409).send({
        message: `This ${alreadyInField} is already in use. Please use a different one.`
      })
    }

    try {
      const newUser = await User.create(data)

      return response.status(201).json(newUser)
    } catch (error) {
      return response.status(400).json({
        message: 'Unable to register'
      })
    }
  }

  async login({ request, response, auth }) {
    const loginSchema = {
      email: 'required|email',
      password: 'required|min:9'
    }

    const validation = await validate(request.all(), loginSchema)

    if (validation.fails()) {
      return response.status(400).send(validation.messages()[0].message)
    }
  
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)

      return response.status(200).json(token)
    } catch (error) {
      return response.status(400).json({
        message: 'Unregistered user'
      })
    }
  }
}

module.exports = UserController
