import networkMapping from '../config/deployments.json';
import fs from 'fs';
import Mustache from 'mustache';

fs.readFile('./subgraph.yaml.mustache', async function(err, data) {

    const chainIds = Object.keys(networkMapping);

    for (const chainId of chainIds) {
        const networkMappingForChain = networkMapping[chainId as keyof typeof networkMapping];
        const networkName = networkMappingForChain[0]['name'];
        const signatureNFTMapping = networkMappingForChain[0]['contracts']['SignatureNFT'];
        const signatureFundMapping = networkMappingForChain[0]['contracts']['SignatureFund'];

        const out = Mustache.render(data.toString(), {
            network: networkName,
            signatureNFTAddress: signatureNFTMapping.address,
            signatureFundAddress: signatureFundMapping.address,
        });

        fs.writeFileSync(
            `./subgraph.${networkName}.yaml`,
            out
        )  
    }

});