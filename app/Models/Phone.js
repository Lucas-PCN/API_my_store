'use strict'

const Model = use('@adonisjs/lucid/src/Lucid/Model')

class Phone extends Model {
  client() {
    return this.belongsTo('App/Models/Client')
  }
}

module.exports = Phone
