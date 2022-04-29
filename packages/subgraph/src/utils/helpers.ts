import { Account } from '../../generated/schema';

export function getOrCreateAccount(id: string): Account {
    let account = Account.load(id);
  
    if (account == null) {
      account = new Account(id);
      account.save();
    }
  
    return account as Account;
  }