const levelup = require('levelup')
const leveldown = require('leveldown')
const path = require('path')

const dbPath = path.join(__dirname, 'signatures')

const signatures = levelup(leveldown(dbPath))

exports.save = async ({ key, value }) => signatures.put(key, value)

exports.check = async ({ key }) => {
  let exists = false
  try {
    exists = !!(await signatures.get(key))
  } catch (err) { /** ignore error here */ }
  return exists
}
