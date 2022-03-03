module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/signatureEconomies',
          permanent: true,
        }
      ];
    },
  }
  