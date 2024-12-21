import { H2 } from '../components/article/Common'
import { P } from '../components/article/Common'
import Image from '../components/image/Image'
import ImageFloat from '../components/image/ImageFloat'
import accountCodes from './account-codes.jpg'
import accountant from './accountant.jpg'
import bookkeeping from './bookkeeping.jpg'
import doubleEntryBookeeping from './double-entry-bookkeeping.jpg'
import naiveBookkeeping from './naive-bookkeeping.jpg'

const headings = [
  'Ledger – a log of all transactions',
  'Double-entry bookkeeping, credits and debits, accounts',
  'What problems do accounting firms and software solutions solve?',
  'BAS-kontoplan and SIE',
]

const body = (
  <>
    <P>
      Among many obligations as a business owner, you must pay taxes. Any
      profits you make are taxed, and taxes are involved whenever you pay
      salaries. There’s also something called value-added tax (VAT). To keep
      track of all these things, one must bookkeep. What does bookkeeping
      involve? We’ll also look at the role of accounting firms and software
      solutions.
    </P>
    <H2>Ledger – a log of all transactions</H2>
    <P>
      A fundamental aspect of bookkeeping is maintaining a{' '}
      <strong>ledger</strong>. Whether we run a company or not, we’re all
      familiar with logging into our bank account to see a list of all
      transactions. Ledgers are similar, where each entry contains an{' '}
      <strong>amount</strong>, a <strong>date</strong>, and a textual{' '}
      <strong>description</strong>. In addition, many entries often have a{' '}
      <strong>document</strong>, such as a receipt or an invoice, accompanying
      it.
    </P>
    <ImageFloat
      data={naiveBookkeeping}
      width={400}
      right
      alt="Ledger entries in a familiar format. This doesn’t cut it in practice, however."
      priority
    />
    <P>
      However, having these fields alone isn’t specific enough. Loaning 100,000
      would otherwise appear the same as selling something for 100,000. Because
      of this, you also need to <strong>categorize</strong> entries in some way
      beyond their textual description.
    </P>
    <H2>Double-entry bookkeeping, credits and debits, accounts</H2>
    <P>
      Understandably, letting every company create entries however they like
      would get extremely messy. Hence, we follow conventions – most companies
      use <strong>double-entry bookkeeping</strong>.
    </P>
    <ImageFloat
      data={accountCodes}
      width={500}
      right
      alt="“Real” vs. nominal/imaginary accounts"
      priority
    />
    <P>
      With double-entry bookkeeping, entries also contain information about how
      the amounts move between different accounts. Most of these accounts aren’t
      “real” ones, like your bank account, but nominal/imaginary ones, invented
      for categorization’s sake. For instance, one account might denote how much
      you’ve sold for. Another might denote how much VAT you owe the tax agency.
      You assign each account an <strong>account code</strong>, typically a
      4-digit identifier.
    </P>
    <P>
      An account you subtract money from is said to be <strong>credited</strong>
      . Conversely, an account you add to is <strong>debited</strong>. If you
      invoice a customer 100,000, you credit 100,000 to the account that denotes
      what you’ve sold for. At the same time, you debit 100,000 to the account
      that denotes what you have in your actual bank account.
    </P>
    <P>
      A real example is slightly more complicated. If 25% VAT, typical in
      Sweden, is factored in, it’s three separate “sub-transactions” rather than
      two: debit 100,000, credit 80,000, and credit 20,000. What’s imperative is
      that the totals of the debits and credits <strong>balance</strong> for
      each entry in your ledger.
    </P>
    <Image
      data={doubleEntryBookeeping}
      width={600}
      alt="Ledger entry, the double-entry bookkeeping version"
    />
    <P>
      As a layman, double-entry bookkeeping confused me at first. After a while,
      I realized what it was all about: it allows entries that are more
      expressive/granular than compared to my initial naive example. In many
      cases, an entry deals with more than two accounts. Double-entry
      bookkeeping keeps the “sub-transactions” grouped and ensures they balance.
      And because you have all these nominal accounts, you can immediately tell
      at any given point how much you’ve sold for or loaned and how much VAT you
      need to pay, even though you don’t have actual bank accounts for them.
    </P>
    <H2>What problems do accounting firms and software solutions solve?</H2>
    <P>
      In a nutshell, they help you manage your ledger and recurrent
      administrative tasks. These tasks often involve submitting reports that
      derive data from your ledger. For instance, both VAT and corporate tax are
      examples of calculated values.
    </P>
    <ImageFloat
      data={accountant}
      width={350}
      left
      alt="An accountant, according to DALL·E 3"
    />
    <P>
      As most transactions involve an invoice or a receipt, such documents are
      typically the “triggers” of creating an entry. If you’re using an
      accounting firm, you might email them documents or drag and drop them to
      their cloud drive.
    </P>
    <P>
      In a software solution, for each uploaded document, you usually go through
      a user interface asking you to describe it. Did you buy a good or a
      service? Was it a domestic purchase? Was it inside or outside the EU? The
      solution will try to determine amounts and dates automatically, but it’s
      not foolproof.
    </P>
    <P>
      While accounting firms use software solutions themselves, by using one,
      you get a smoother user experience. The “interface” is much smaller: you
      don’t have to learn the user interface of the underlying software
      solution, and you won’t have to figure out any ambiguities or deal with
      bugs and edge cases.
    </P>
    <H2>BAS-kontoplan and SIE</H2>
    <P>
      In Sweden, companies overwhelmingly follow a standard called
      BAS-kontoplan. In essence, BAS-kontoplan standardizes account codes – for
      instance, you’d use 1930 to denote what you have in your corporate bank
      account and 1630 for what you have in your tax account. By following
      BAS-kontoplan, ledgers are more portable, and you’ll also have access to
      generic tools that generate the required reports. To make these things
      possible, a non-profit organization has created a file format called SIE
      (Standard Import och Export).
    </P>
  </>
)

export const article = {
  thumbnail: bookkeeping,
  title: 'What is bookkeeping?',
  teaser:
    'All companies must bookkeep. What does it involve? How do accounting firms help?',
  published: 1706442834,
  readingTime: 4,
  headings,
  body,
  category: 'accounting',
}
