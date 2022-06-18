'use strict'

Promise.all([
  import('dotenv/config').then((e) => e),
  import('ethers').then(({ ethers }) => global.ethers = ethers),
  import('./src/services/secret.js').then((e) => global.secretService = e.default)
]).then((e) => {
  console.log('done')
  return (async () => {
    try {
      var secretClient = async (projectId) => secretService.build({ projectId })
      var projectId = 'kernel-signature-staging'
      global.client = await secretClient(projectId)
      //var secret = await client.access({secretId: 'arweaveJwk'})
    } catch (error) {
      console.log(error)
    }
  })()
}).catch((e) => console.log(e))
