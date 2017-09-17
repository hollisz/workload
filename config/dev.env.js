var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
let moment = require('moment')

console.log(moment().startOf('hour').fromNow());

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
