'use strict'

Promise.all([
  import('dotenv/config').then((e) => e),
  import('ethers').then(({ ethers }) => global.ethers = ethers),
  import('./src/services/secret.js').then((e) => global.secretService = e.default)
]).then((e) => {
  console.log('done')
  return (async () => {
    try {
      global.secretClient = async (projectId) => secretService.build({ projectId })
      global.addArweaveSecret = async (filename) => {
        if (!filename) {
          console.log('missing filename')
          return
        }
        const data = fs.readFileSync(filename)
        const projectId = 'kernel-signature-prod'
        const client = await secretClient(projectId)
        const secretId = 'arweaveJwk'
        //const result = await client.list()
        const result = await client.add({ secretId, data })
        return result
      }
      //var secret = await client.access({secretId: 'arweaveJwk'})
    } catch (error) {
      console.log(error)
    }
  })()
}).catch((e) => console.log(e))
