'use strict'

const Model = use('@adonisjs/lucid/src/Lucid/Model')

class Client extends Model {
  address() {
    return this.belongsTo('App/Models/Address');
  }

  phone() {
    return this.hasOne('App/Models/Phone');
  }

  sales() {
    return this.hasMany('App/Models/Sale');
  }
}

module.exports = Client
