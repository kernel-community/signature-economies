module.exports.signTokenId = async function(signer, tokenId, url) {
	const message = ethers.utils.keccak256(
		ethers.utils.defaultAbiCoder.encode(
					['uint256', 'string'],
					[tokenId, url],
			),
	);
	const signature = await signer.signMessage(ethers.utils.arrayify(message));
	return { message, signature };
}