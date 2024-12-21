import { H2, Ol, Ul } from '../components/article/Common'
import { P } from '../components/article/Common'
import Image from '../components/image/Image'
import ImageFloat from '../components/image/ImageFloat'

import shortcomings from './shortcomings.jpg'
import irrelevantFeaturesAndLists from './irrelevant-features-and-lists.jpg'
import searchAndSelectTemplate from './search-and-select-template.jpg'
import nonExcludedSuggestions from './non-excluded-suggestions.jpg'
import skiingReceipt from './skiing-receipt.jpg'
import cumbersomeToAdjust from './cumbersome-to-adjust.jpg'
import taxesConfused from './taxesConfused.jpg'

const headings = [
  'Feature bloat',
  'Repetitive critical user journey',
  'Lackluster parsing logic for documents',
  'No tax account integration',
  'Edge case with salaries',
]

const body = (
  <>
    <P>
      Up until 2023, I used a Swedish accounting solution called Bokio. It was
      aimed at small businesses and was generally well-regarded. It had a modern
      UI, was easy to use, and had helpful guides and to-dos, making bookkeeping
      accessible to beginners like me. However, after using it for a whole year,
      I longed for something better.
    </P>
    <P>
      As an independent developer, I found Bokio full of useless features. When
      it came to the few features I truly needed, they weren’t as usable or
      sophisticated as I had hoped. Mind you, when I used Bokio, it was already
      an eight-year-old product, recently acquired for over 150 million USD. In
      this article, we’ll stick to discussing Bokio, the product. But stay tuned
      – there’s a ton of drama involving what might be one of the worst
      acquisitions as far as Swedish software companies are concerned. I’ll do a
      write-up in due time.
    </P>
    <H2>Feature bloat</H2>
    <P>
      As my subscription ended in 2023, I recorded and took notes of all the
      useless features:
    </P>
    <Ul>
      <li>
        The <strong>dashboard</strong> you landed on after logging in. It
        functioned as an ad space, where Bokio displayed banners and widgets
        trying to upsell you.
      </li>
      <li>
        The lists containing <strong>to-dos and important dates</strong> applied
        too broadly, resulting in false positives. For instance, it listed items
        relevant only to people running foundations and items only applicable to
        businesses that owned real estate. Additionally, since there’s no
        integration with the actual “source of truth” (often the tax agency),
        you had to manually check off items even though you’d completed the very
        thing. These lists were also redundant because almost all items already
        exist in the tax agency’s dashboard.
      </li>
      <li>
        <strong>Charts, graphs, and reports</strong>. As an independent
        developer, granular month-by-month breakdowns, visualizing trends, and
        top five lists of expenses or revenue streams had little to no value to
        me.
      </li>
      <li>
        <strong>Invoice management</strong>. By the nature of my business, I
        strive to have a single “employer” for several months or even years –
        generating my invoices is trivial and already handled externally by a
        time reporting system.
      </li>
      <li>
        <strong>E-commerce solutions</strong>,{' '}
        <strong>supplier management</strong>, and{' '}
        <strong>employee management</strong> (salaries, vacations, expenses). I
        neither do e-commerce nor work with suppliers other than paying for a
        few SaaS products. Using the employee management tool was too overkill
        for a solo company. There was also an edge case I bumped into involving
        salaries, which we’ll look at.
      </li>
      <li>
        <strong>“Additional services”</strong>. Another ad space, where they
        listed different accounting firms and links to partners that sell
        insurance, hotel stays, office supplies, etc.
      </li>
      <li>
        An elaborate <strong>Settings</strong> section. You could configure
        everything from notifications to basic theming for quotes, invoices, and
        salary slips.
      </li>
    </Ul>
    <Image
      data={irrelevantFeaturesAndLists}
      width={800}
      alt="Most of the sidebar menu led to features that provided little value to me. Of all the “important dates” shown, only one was relevant let alone important."
    />
    <P>
      Besides the feature bloat, you’d often see alerts/message boxes/”request
      help” buttons when performing actions. While they might be genuinely
      helpful the first few times, once you know what you’re doing, those
      elements clutter the UI. Having a truckload of useless features isn’t
      always a problem, but in this case, they occupy a lot of screen space –
      more than two-thirds of the sidebar menu led to those features.
    </P>
    <H2>Repetitive critical user journey</H2>
    <P>
      When bookkeeping, you’ll spend most of your time uploading receipts and
      invoices and creating ledger entries based on them. While Bokio did OK in
      this department, it didn’t meet my expectations.
    </P>
    <P>
      First of all, I found the experience <strong>overly repetitive</strong>.
      To create a ledger entry from a document, you had to:
    </P>
    <ImageFloat
      data={searchAndSelectTemplate}
      width={400}
      alt="How the template search looked like"
      right
    />
    <Ol>
      <li>Drag and drop/upload your file to Bokio</li>
      <li>Click “Bookkeep”</li>
      <li>Select one of four main categories. Then, click “Next”</li>
      <li>
        Begin typing into a text input to search for a template (essentially a
        sub-category). Then, click on one of the search results.
      </li>
      <li>
        Before typing, Bokio suggests the five most frequently used templates
      </li>
      <li>
        Verify that the automatically detected total, VAT, and payment date are
        correct. Make adjustments if necessary. Then, click “Next”.
      </li>
      <li>Finally, verify that the entry is correct by clicking “Bookkeep”</li>
    </Ol>
    <P>
      While this flow certainly worked and might even be optimal for beginners,
      it became frustrating after repeating it dozens of times once you knew
      what you were doing.
    </P>
    <P>
      The number of templates I’m interested in is limited. It’s far lower than
      50. For this reason, breaking down the selection of a template into two
      steps adds more work. Having to go through the final confirmation is also
      unnecessary. If you’ve chosen a template, you’ll already know what the
      entry will look like.
    </P>
    <P>
      Beyond the redundant steps, Bokio{' '}
      <strong>didn’t support bulk actions</strong>. If I go on a business trip,
      I’ll end up with a half-dozen travel-related receipts that are all dealt
      with the same.
    </P>
    <P>
      The <strong>suggestion feature</strong>, while a good idea, was{' '}
      <strong>implemented abysmally</strong>. In the step before suggestions,
      you select one of four main categories. However, that selection did not
      filter out any suggestions belonging to other categories. Additionally,
      listing the five most frequently used isn’t the best (and made worse by
      the lack of filtering). More than half the time, I never clicked on a
      suggestion. As mentioned earlier, I often found myself handling similar
      documents after one another – it would’ve been better if the top
      suggestion was “most recently used.”
    </P>
    <Image
      data={nonExcludedSuggestions}
      width={800}
      alt="Suggestions belonging to other categories are being shown despite having selected a main category"
    />
    <H2>Lackluster parsing logic for documents</H2>
    <P>
      As part of the critical user journey, Bokio tried to determine the{' '}
      <strong>total, VAT, and payment date</strong> for every uploaded document.
      While it handled some documents well, the times when it failed left me
      feeling that whatever algorithm they had{' '}
      <strong>lacked sophistication</strong>. And when it failed, it was{' '}
      <strong>inconvenient to make adjustments</strong>.
    </P>
    <ImageFloat
      data={skiingReceipt}
      width={450}
      alt="The lift ticket PDF receipts"
      right
    />
    <P>
      Sweden has an employee wellness allowance – I occasionally bookkeep
      skiing-related receipts. In those PDFs, the values for total and VAT,
      respectively, are visible. Bokio also hinted that it had detected them by
      overlaying each value with a clickable rectangle. Yet, Bokio only
      prefilled the total for you. It had somehow not understood the other value
      as being VAT. Mind you, up until this point, the following has happened:
    </P>
    <Ul>
      <li>
        Bokio has detected two values from the uploaded PDF and assumed one of
        them to be the total.
      </li>
      <li>
        You’ve told Bokio you want to use the “wellness allowance” template. VAT
        is 6% for sporting activities in Sweden.
      </li>
      <li>The expression “VAT (6%)” appears in the PDF.</li>
      <li>
        Sweden uses 0%, 6%, 12%, 25%. The other value can only be arrived at
        assuming 6%.
      </li>
    </Ul>
    <P>
      In this instance, Bokio felt like a love interest to whom you’ve given all
      the hints, yet they still don’t get it. But it gets worse. Remember the
      overlaid rectangles? You can click on them, and Bokio will place their
      values into whatever input you have focused on. Except it didn’t work this
      way – the input for the total is always used as the target. The cherry on
      top is that Bokio tried to parse the payment date of these cursed receipts
      by using my date of birth. I was born before PDFs were invented.
    </P>
    <Image
      data={cumbersomeToAdjust}
      width={800}
      alt="Although you could click on detected values to populate inputs, Bokio always treats the input for the total as the target. It also bases the payment date on my date of birth, and ends up with a date that is way into the future."
    />
    <H2>No tax account integration</H2>
    <P>
      Every month, you’ll typically create five or so tax-related ledger
      entries. For a company like mine, they make up a large percentage of all
      entries. Since Bokio didn’t offer any tax account integration back then,
      it resulted in lots of manual work.
    </P>
    <P>
      Remember the five most frequently used templates? Three of mine were
      tax-related – had this integration been in place, Bokio could’ve excluded
      them from the pool of suggestions.
    </P>
    <H2>Edge case with salaries</H2>
    <P>
      When running your own company, there’s flexibility in deciding when you
      pay salaries. Heck, if you want to, you can pay your entire year’s salary
      in one lump at the turn of the new year as the fireworks go off.
      Unsurprisingly, doing non-standard things didn’t work well with Bokio’s
      employee management tool. The issue involved how it calculated your
      pay-as-you-earn-tax.
    </P>
    <ImageFloat
      data={taxesConfused}
      width={350}
      alt="Bokio’s automatic tax calculation for salaries breaks down if you pay larger lumps"
      left
    />
    <P>
      In Sweden, you pay income tax based on your total earnings for a given
      year. If you receive a monthly salary, you don’t pay that tax in a single
      go – your employer makes payments on your behalf by withholding some money
      every month. Because it’s impossible to know your total earnings in
      advance, you typically estimate by extrapolating your monthly salary.
    </P>
    <P>
      Herein lay the problem: if you wanted to pay a large lump, Bokio
      automatically assumed your yearly income was 12 times that amount,
      resulting in paying much more tax in advance than is necessary. For
      example, if your monthly salary is 50.000, your effective tax rate would
      be around 23%. If you wanted to pay 600.000 in one go, Bokio would apply a
      tax rate of 48%.
    </P>
  </>
)

export const article = {
  thumbnail: shortcomings,
  title: 'Accounting software shortcomings',
  teaser:
    'For a year, I used a solution called Bokio. It left me longing for something better.',
  published: 1708180141,
  readingTime: 6,
  headings,
  body,
  category: 'accounting',
}
