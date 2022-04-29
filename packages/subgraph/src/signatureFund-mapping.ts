import { BigInt, log } from '@graphprotocol/graph-ts';
import {
  Approval,
  ApprovalForAll,
  DonationReceived,
  Transfer,
} from '../generated/SignatureFund/SignatureFund';
import { Account, SignatureFund } from '../generated/schema';
import { getOrCreateAccount } from './utils/helpers';

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleDonationReceived(event: DonationReceived): void {
  const donor = event.params.donor.toHexString();
  const tokenId = event.params.tokenId.toString();

  const donorAccount: Account = getOrCreateAccount(donor);

  let nft = SignatureFund.load(tokenId);
  if (nft == null) {
    nft = new SignatureFund(tokenId);
  }
  nft.steward = donorAccount.id;
  nft.donationAmount = event.params.amount;
  nft.uri = event.params.uri.toString();
  nft.save();

  donorAccount.save();
}

export function handleTransfer(event: Transfer): void {}
