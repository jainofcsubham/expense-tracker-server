import { TransactionData } from "../types";

function parseTransaction(transaction: string): TransactionData | null {
    const amountRegex = /Rs\.?\s?(\d+\.?\d{0,2})/;
    const debitCreditRegex = /(debited|credited)/;
    const upiRegex = /VPA|UPI/;
    const creditCardRegex = /Credit Card/;
  
    const amountMatch = transaction.match(amountRegex);
    const debitCreditMatch = transaction.match(debitCreditRegex);
    const isUPI = upiRegex.test(transaction);
    // const isCreditCard = creditCardRegex.test(transaction);
  
    if (!amountMatch || !debitCreditMatch) {
      return null;
    }
  
    const amount = parseFloat(amountMatch[1]);
    const transactionType = debitCreditMatch[1] === 'debited' ? 'debit' : 'credit';
    const transactionMethod = isUPI ? 'debit' : 'credit';
  
    return {
      amount,
      transactionType,
      transactionMethod
    };
  }