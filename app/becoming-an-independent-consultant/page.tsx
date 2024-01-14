import Image from '../../src/components/image/Image'
import {
  H2,
  H3,
  P,
  Ul,
  UlReferences,
} from '../../src/components/article/Common'
import Link from '../../src/components/Link'

import independent from './independent.jpg'
import consultantVsContractors from './consultant-vs-contractors.jpg'
import { Article } from '../../src/components/article/Article'
import { Metadata } from 'next'

const headings = [
  'Consulting is lucrative in Sweden',
  'Freelancing, contracting, and consulting. Is there a difference?',
  'Two categories of work',
  'Pitfall: becoming independent too early',
  'Additional caveats',
  'Where do I see myself?',
  'How should I stand out to do category 2 work?',
]

const body = (
  <>
    <P>
      As 2021 approached, I experienced burnout for the first time in my 10-year
      career. Working for a startup, the expectations we set on ourselves had
      spiraled out of control.
    </P>
    <P>
      After handing in my notice, I felt lost. What should I do next? Being a
      frequent reader of Y Combinator, I dipped my toe into the world of SaaS.
      Creating a successful product is an alluring thought. But like others, I
      soon realized that coding is a mere fraction of what leads to success.
    </P>
    <P>
      An ambition of mine has been to excel at software development. Compare
      making a great, successful product to excelling as a developer, and it’s
      clear the latter is less unrealistic and involves more work aligning with
      my interests.
    </P>
    <P>
      With 2022 well underway, I’m eager to get back on the treadmill. This
      time, I’m planning on becoming a consultant. In some sense, I’m still
      creating a product. Except this one doesn’t float on a cloud.
    </P>
    <P>
      But why do some people become consultants in Sweden? Is there a
      distinction between freelancing, contracting, and consulting? Caveats and
      pitfalls? Finally, where do I see myself in all of this?
    </P>
    <H2>{headings[0]}</H2>
    <P>
      Having a regular job comes with a ton of benefits. There’s stability and,
      besides giving your employer your bank details, not much else you need to
      track. At worst, you’ll have to log your hours using something resembling
      a college project from a decade ago.
    </P>
    <P>
      As an independent consultant, you trade off stability. Someone can fire
      you in the blink of an eye. Survive a bus hitting you, and you won’t have
      colleagues covering for you as you recuperate.
    </P>
    <P>
      But you can earn much more. You’re paid more for every hour’s work and pay
      less tax by essentially splitting your income in two:
    </P>
    <Ul>
      <li>the usual monthly salary</li>
      <li>a yearly dividend</li>
    </Ul>
    <P>
      Income in the top bracket has a marginal tax rate of ~70%, which senior
      developers will hit. Dividends, however, are only taxed at 20% (below a
      threshold). So you give yourself a comparatively low salary and make up
      the difference and more through dividends. Invest excess money and save
      some for rainy days.
    </P>
    <P>Sounds too good to be true, right? Let’s explore some caveats.</P>
    <H2>{headings[1]}</H2>
    <P>
      Like in programming, certain words are often used interchangeably and have
      overlap. Where the terms generally differ has to do with factors such as
      project size and length. Is a deadline set? Do you decide your schedule,
      and can work be done at your own office? Do you have multiple clients
      simultaneously, and is there an agency involved?
    </P>
    <P>
      A freelancer could help a small business owner launch a new website. The
      assignment is non-recurrent and irregular for the business owner, while
      the freelancer completes it wherever they want.
    </P>
    <P>
      Contractors and consultants in Sweden typically work as embedded team
      members. But there’s a subtle yet significant difference between a
      contractor and a consultant.
    </P>
    <H2>{headings[2]}</H2>
    <P>
      When you boil it down, companies hire you for two reasons: either to do
      work that someone doesn’t want to do or to do work that someone can’t.
      From these two categories, it’s easy to tell the type of work you’ll be
      doing and how you’ll be treated depending on where you land.
    </P>
    <P>
      To give an extreme example: the architect behind the tallest building in
      the world is Adrian Smith. He along with his firm belongs to category 2.
      But what about the construction workers who labored in the scorching
      desert heat? Category 1. I’ve been intentionally vague — you never know
      where the coming JavaScript conferences may be.
    </P>
    <Image
      data={consultantVsContractors}
      width={915}
      alt="An extreme example of the difference between consultant and contractor."
    />
    <P>
      A company might have codebases that its developers don’t want to touch for
      one reason or another. So they get contractors to maintain them, reducing
      employee attrition. A studio might have a new game blow up overnight. They
      then fly in consultants to solve scaling issues both near-term and
      long-term.
    </P>
    <P>
      Contractors build according to specifications. They maintain systems and
      augment existing staff. Consultants tend to design and work on objectives.
    </P>
    <P>How do we avoid getting into category 1?</P>
    <H2>{headings[3]}</H2>
    <P>
      Early in your career, you offer little in doing work that someone can’t.
      If you do, the place you’re working at lacks depth.
    </P>
    <P>
      If you end up in the first category, you’ll be drowning in mindless work.
      You couldn’t care less about the product. The client is shorthanded
      because they don’t value people and foster a toxic environment. Oh, and
      their software is a mess too.
    </P>
    <P>
      On the other hand, if you end up in the second category, you’ll lack
      challenging problems to tackle and seniors to work alongside.
    </P>
    <P>
      The main point is that you want to expose yourself to environments that
      maximize growth, not stifle it. And in category 1, you’ll end up
      disillusioned in a few years and proclaim that{' '}
      <span className="italic">everything</span> is wrong with the industry.
    </P>
    <H2>{headings[4]}</H2>
    <P>As employers can fire you on a whim, you have to perform.</P>
    <P>
      Anyone who’s worked long enough has seen a broad spectrum of developers.
      Some provide tremendous value to the organizations that pick them up,
      while others can’t cobble up a basic CRUD if their life depended on it.
      Now, I’m not a career expert, but you should probably not go independent
      if you’re the latter.
    </P>
    <P>
      Because you’re easy to let go of, the interview process is much shorter,
      making first impressions matter more. You have less time to convince
      others that you’re sane, have relevant skills, can communicate, and are
      pleasant to be around.
    </P>
    <P>
      You also can’t get too comfortable. If you’re a web developer writing
      pre-ES6 JavaScript in 2022 — that’s the very definition of complacency.
      And whether you like it or not, you have to explore shiny things from time
      to time.
    </P>
    <H2>{headings[5]}</H2>
    <P>
      I’ve got some experience under my belt now and have managed to reach a
      senior level in my last two employments.
    </P>
    <P>
      On the plus side, I’ve worked for three years at Paradox Interactive. It’s
      a well-known gaming company, meaning many developers and hiring managers
      will recognize it. On the negative side, my latest employer is relatively
      unknown as they provide a closed platform to enterprises.
    </P>
    <P>
      Categorizing the domains I’ve worked in, I started with e-commerce and
      ventured into single-page applications, desktop applications, and rich
      text editors. My last job involved a broad role, with the domain addition
      of SSO. The lack of a common thread can be both a plus and a minus.
    </P>
    <P>
      An advantage is that I’ve got a sizeable amount of original code (not
      libraries glued together) on GitHub. While I don’t expect anyone from a
      large organization to look at it, someone at a small company might. Every
      new hire matters more at that stage, so they’ll hopefully devote more time
      screening people.
    </P>
    <H2>{headings[6]}</H2>
    <P>
      Currently, my strength lies in having a broad skill set. I can do backend
      work, set up continuous integration, and not feel lost staring at the AWS
      console. I can do frontend work and create an acceptable user interface. I
      communicate well with developers and non-technical stakeholders and
      involve others in designs. I can do these things, but certainly not at the
      same level as someone dedicated in one area.
    </P>
    <P>
      With this in mind, I think startups would benefit the most from bringing
      me in as category 2. I also envision a company with mainly junior staff
      bringing me in to help them and offer mentorship for a while. A third
      possibility involves a company moving to React and JavaScript/TypeScript
      needing guidance.
    </P>
    <P>
      Down the line, however, I do wonder whether I’ll need to specialize more.
      The deliberation is probably pointless right now, and it’s best to
      evaluate as I go along.
    </P>
    <H3>Read more</H3>
    <div className="text-sm">
      <P>Detailed, practical guides about pursuing the independent path:</P>
    </div>
    <UlReferences>
      <li>
        <Link
          href="https://github.com/tomasbjerre/starta-eget-konsultbolag"
          external
        />
      </li>
      <li>
        <Link href="https://github.com/nabati/freelancing-in-sweden" external />
      </li>
    </UlReferences>
  </>
)

export const article = {
  thumbnail: independent,
  title: 'Becoming an independent consultant',
  teaser:
    'Why do people take this path in Sweden? What are the general pitfalls and caveats?',
  published: 1645438733,
  readingTime: 5,
  headings,
  body,
}

export const metadata: Metadata = {
  title: article.title,
  description: article.teaser,
}

export default function Page() {
  return <Article {...article} />
}
