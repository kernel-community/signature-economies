import { BigInt, log } from '@graphprotocol/graph-ts';
import {
  Approval,
  ApprovalForAll,
  SignCreated,
  Transfer,
} from '../generated/SignatureFund/SignatureFund';
import { Account, SignatureFund } from '../generated/schema';
import { getOrCreateAccount } from './utils/helpers';

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleSignCreated(event: SignCreated): void {
  const signer = event.params.signer.toHexString();
  const tokenId = event.params.tokenId.toString();

  const signerAccount: Account = getOrCreateAccount(signer);

  let nft = SignatureFund.load(tokenId);
  if (nft == null) {
    nft = new SignatureFund(tokenId);
  }
  nft.steward = signerAccount.id;
  nft.signedAmount = event.params.amount;
  nft.uri = event.params.uri.toString();
  nft.selectMeta = event.params.selectMeta.toString();
  nft.save();

  signerAccount.save();
}

export function handleTransfer(event: Transfer): void {}
