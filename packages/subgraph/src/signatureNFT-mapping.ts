import { BigInt, log } from '@graphprotocol/graph-ts'
import {
  Approval,
  ApprovalForAll,
  NewSignature,
  Transfer,
} from '../generated/SignatureNFT/SignatureNFT'
import { Account, SignatureNFT } from '../generated/schema'
import { getOrCreateAccount } from './utils/helpers';

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleNewSignature(event: NewSignature): void {
  const signer = event.params.signer.toHexString();
  const tokenId = event.params.tokenId.toString();

  const signerAccount: Account = getOrCreateAccount(signer);

  let nft = SignatureNFT.load(tokenId);
  if (nft == null) {
    nft = new SignatureNFT(tokenId);
  }
  nft.steward = signerAccount.id;
  nft.uri = event.params.uri.toString();
  nft.createdAtTimestamp = event.block.timestamp;
  nft.save();

  signerAccount.save();
}

export function handleTransfer(event: Transfer): void {}