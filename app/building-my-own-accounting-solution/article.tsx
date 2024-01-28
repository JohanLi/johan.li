import { H2 } from '../components/article/Common'
import { P } from '../components/article/Common'
import ImageFloat from '../components/image/ImageFloat'
import Image from '../components/image/Image'

import accounting from './accounting.jpg'
import regularVsIndependent from './regular-vs-independent.jpg'
import timelineOfEvents from './timeline-of-events.jpg'

const headings = [
  'Going independent',
  'Not going for an accounting firm',
  'Issues with off-the-shelf solutions',
  'Building an online portfolio',
]

const body = (
  <>
    <P>
      In 2022, I started working as an independent developer. But rather than
      conventionally handling my bookkeeping through an accounting firm or using
      established software solutions, I created a bespoke solution.
    </P>
    <P>
      Why did I go down this path? Shouldn’t I know better than to reinvent the
      wheel? What is this “independent” thing all about, and why does it mean I
      need to bookkeep?
    </P>
    <H2>Going independent</H2>
    <ImageFloat
      data={regularVsIndependent}
      width={350}
      right
      alt="Employed vs. independent"
      priority
    />
    <P>
      In Sweden, it’s not uncommon for senior developers to go independent to
      earn more. While “egenkonsult” – which translates literally to “own/self
      consultant” – is the term, most of us, including myself, are contractors.
      We augment existing staff. The main difference is that we run a company to
      bill our “employer,” and pay our salary through that same company.
    </P>
    <P>
      How exactly does this setup make one earn more? The short answer is that
      it’s hard to let people go in Sweden – that “employer” pays a premium for
      flexibility. It’s an Americanization of the Swedish system, where you
      become at-will employed of your own volition.
    </P>
    <P>
      Because you’re independent, there’s little to no overhead. Additionally,
      you pay a portion of your salary through dividends, taxed lower than pure
      income.
    </P>
    <P>
      Besides having no job security, another trade-off is that you must handle
      everything that comes with running a company. You need to record revenues
      and expenses. Hold onto receipts. Submit reports to government agencies.
      There’s a lot to learn and many things to keep track of.
    </P>
    <H2>Not going for an accounting firm</H2>
    <P>
      Typically, you’d call up a firm for help. They ask you questions, provide
      you with instructions, and take care of all mundane tasks. If you’re an
      independent developer, the cost of using one is insignificant.
    </P>
    <P>
      In my case, I started my company in 2020, two years before I started
      looking for work. In other words, there was a long stretch where little
      administrative work was needed. Instead, I paid for a software solution
      tailored to small business owners.
    </P>
    <P>
      All this meant my learning curve wasn’t as steep. Once my business took
      off in 2022, I felt like continuing with the software solution I used was
      manageable.
    </P>
    <Image data={timelineOfEvents} width={800} alt="Timeline of events" />
    <H2>Issues with off-the-shelf solutions</H2>
    <P>
      So why build my own? The solution I used worked, but it wasn’t great. You
      had to do repetitive things. It handled certain receipts laughably bad,
      and I ran into edge cases. The interface was also cluttered, in large part
      because I only needed 10% of their features.
    </P>
    <P>
      One lackluster solution doesn’t mean all of them are as bad. However, if
      one of the better ones tailored to companies like mine were this lacking,
      it certainly wasn’t a good sign. To be fair, I think the truth is that I
      set the bar higher by being a software developer – any manual steps that
      seem unnecessary grind my gears.
    </P>
    <P>
      I’ve also found that accounting solutions cannot solve a particular user
      experience: obtaining and organizing invoices and receipts before they
      even get uploaded into the solution. It’s simply not scalable from an
      engineering perspective.
    </P>
    <P>
      If I make my own solution, I can reduce all the repetition. My previous
      edge cases will become use cases, and anything non-scalable becomes
      scalable if I’m the sole user. And while I recognize accounting solutions
      are far from trivial, those 10% of features feel within reach, especially
      if I take shortcuts.
    </P>
    <P>
      I also have a confession to make. I’ve built software professionally for a
      decade, but I’ve never been an actual user of the things I’ve created over
      the years. This time it’ll finally be different.
    </P>
    <H2>Building an online portfolio</H2>
    <P>Remember that zero job security thing I mentioned?</P>
    <P>
      I’m technically an employer now, and I sympathize with them. It’s hard to
      find, let alone discern, good developers. We overstate our accomplishments
      and embellish our qualities. Self-awareness isn’t really in abundance, and
      there’s the Dunning-Kruger effect.
    </P>
    <P>
      I’ve learned over the years to “show, not tell.” That’s also one of my
      ambitions with this project. If you follow along, you can judge how I
      learn, approach problems, communicate, code, and reason about software.
      Whatever qualities I claim I have will hopefully come across.
    </P>
  </>
)

export const article = {
  thumbnail: accounting,
  title: 'Building my own accounting solution',
  teaser:
    'Rather than enlisting a firm or using off-the-shelf solutions, I built my own. Here’s why.',
  published: 1705765945,
  readingTime: 3,
  headings,
  body,
  category: 'accounting',
}
