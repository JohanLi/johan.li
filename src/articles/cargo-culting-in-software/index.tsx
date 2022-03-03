import React from 'react';

import Image from '../../components/image/Image';
import ArticleLayout from '../../components/article/ArticleLayout';
import { H2, H3, P, UlReferences } from '../../components/article/Common';
import Link from '../../components/Link';
import { ArticleMetadata } from '../../components/article/articleTypes';

import vanuatuJohnFrumDay from './vanuatu-john-frum-day.jpg';
import microservices from './microservices.png';
import agile from './agile.png';
import agileLarge from './agile-large.png';

const headings = [
  'Origin',
  'In software',
  'Microservices',
  'Agile',
  'Thoughts',
];

export const metadata: ArticleMetadata = {
  image: vanuatuJohnFrumDay,
  teaser:
    'The dangers of copying successful people and companies, in the hopes of achieving the same success.',
  title: 'Cargo culting in software',
  published: 1575158400,
  readingTime: 6,
  headings,
};

export default function Article() {
  return (
    <ArticleLayout metadata={metadata}>
      <P>
        In everyday life, we do certain things. Decide certain things. Not
        always because we understand why, but because people who are successful
        — people who we look up to — appear to be doing it. In the world of
        software, this phenomenon is called cargo culting.
      </P>
      <P>
        How and where did this strange term originate? What are some examples of
        cargo culting in the software industry? If it does occur, should we as
        developers embrace a certain mindset? And is cargo culting necessarily a
        bad thing?
      </P>
      <H2>{headings[0]}</H2>
      <P>
        The term has its roots in World War II. The Allies deployed troops to
        islands in the Pacific Ocean, establishing airbases. Planes regularly
        flew over them, dropping cargo as the natives watched in astonishment.
        What is going on? All this technology. All these changes to the
        surroundings. Food and equipment, falling from the skies?
      </P>
      <Image
        src={vanuatuJohnFrumDay}
        width={800}
        height={600}
        alt="Vanuatu, an island country in the Pacific Ocean, has a cargo cult that survives to this day."
      />
      <P>
        The troops abandoned the islands after the war. No more cargo dropped.
        But some natives, in an attempt to get cargo to drop again, tried to
        restore their surroundings. They built fabricated control towers and
        replicas of airplanes. They paraded, carrying wooden rifles, and stood
        on runways, waving tree branches.
      </P>
      <P>
        Having mistaken correlation for causation, they formed a cult — a cargo
        cult.
      </P>
      <H2>{headings[1]}</H2>
      <P>
        In software, cargo culting can come in many different shapes and forms.
        Sometimes, we copy-paste code snippets from Stack Overflow without
        understanding how they work. Occasionally, we run terminal commands to
        solve problems we don’t understand. We follow conventions, patterns, and
        principles, yet are unable to explain why some of them exist.
      </P>
      <P>
        But beyond the individual lines of code, cargo culting can also affect
        applications and even organizations at large. Two such examples are
        microservices and Agile.
      </P>
      <H2>{headings[2]}</H2>
      <P>
        A piece of software starts small. As time goes on, features get added.
        More use cases need to be supported, and the codebase gets larger. To
        manage the growth in complexity, we separate concerns and modularize our
        code.
      </P>
      <P>
        So the appeal of microservices is apparent. You have small and
        independent components that can be created and maintained by small and
        independent teams. They can also be deployed and scaled independently.
        Because they’re small and specific, it’s easier to make them reusable.
        Besides, Amazon and Netflix are using microservices, and they’re
        successful. It would be reasonable to assume that if we use
        microservices, we’ll be successful, too, right?
      </P>
      <Image
        src={microservices}
        width={800}
        height={240}
        alt="A monolith split into microservices."
      />
      <P>
        In reality, we’re making considerable tradeoffs. What if we need to work
        on a feature that spans multiple services? Do we still benefit much from
        having independent components and teams? How do we orchestrate, monitor,
        and troubleshoot all our services? While great tools exist nowadays,
        they are still tools we need to know about and know how to use well.
      </P>
      <P>
        At the same time, having a monolith doesn’t stop us from modularizing
        our code. We intend to adopt microservices because the monoliths we’ve
        worked on always turn out “messy.” If that’s the case, are we sure we’ll
        do a good job splitting our monolith? If we struggle managing a single
        service, will things get better with microservices? Will we end up with
        an even more complex monolith that we pretend are microservices?
      </P>
      <P>
        Microservices are great and solve real problems. Otherwise, Amazon and
        Netflix wouldn’t be using them. But we have to take the time to
        understand these organizations and look ourselves in the mirror. Do we
        share the same challenges, and do we have the resources? Does it make
        sense to use microservices right now?
      </P>
      <P>
        It’s also worth asking ourselves the tough questions. Are we adopting
        microservices because we’re skirting around actual problems? Problems
        with communication and cooperation? Have we hired too many developers
        who chase shiny objects? Is there a lack of technical leadership? Are
        people making abrupt decisions when they come back from tech
        conferences?
      </P>
      <P>
        These are questions we must answer. If we don’t, we might end up in a
        scenario where two developers create ten microservices at a startup, for
        a product that’s still in a state of flux. Too busy dealing with
        self-imposed problems, to be delivering value to end users.
      </P>
      <H2>{headings[3]}</H2>
      <P>
        Creating software requires coordination and collaboration. A term that
        gets brought up in this context is Agile: we’re an Agile organization,
        we do Agile software development, we’re Agile. It’s brought up so often,
        in different settings, that once in a while, we have to look up what
        Agile is.
      </P>
      <Image
        src={agile}
        width={800}
        height={285}
        zoomSrc={agileLarge}
        alt="Colleagues gathering around a Scrum Board."
      />
      <P>
        Agile was born in response to the ideas of Frederick Taylor. He was one
        of the most influential figures of the 20th century, having improved
        industrial efficiency. He viewed the average worker as uneducated and
        lazy. So you get intelligent people and pay them more, to figure out how
        the workers should work. This thinking was also prevalent in the
        software industry.
      </P>
      <P>
        But having separate process people doesn’t lend itself well to software
        development. We’re knowledge workers. We’re well educated and well paid.
        Our work is highly contextual, seeing as software solves a wide array of
        problems in all kinds of organizations, industries, and countries.
        Therefore, a pillar of Agile is letting actual workers decide how they
        work, adjusting as they go along.
      </P>
      <P>
        As it also turns out, gathering requirements and planning long-term is
        challenging in software development. Thus, another pillar of Agile is to
        prefer responding to change over following a plan. But what’s not so
        apparent, is that you need technical expertise to do this well. You need
        developers who write modular code, create tests, set up continuous
        integration, and refactor often. Last but not least, the rest of an
        organization needs to understand this.
      </P>
      <P>
        Yet, contrary to the two pillars, we enforce a one-size-fits-all
        process. We rename project managers “scrum masters” and stakeholders
        “product owners.” We rename our meetings “stand-ups,” buy planning poker
        decks, and start using the word “sprints.” While this is going on, the
        command and control mindset still permeates our organization.
        Hierarchies in communication remain. We continue viewing our developers
        as assembly line workers. We have neither plans to raise the technical
        skills of our developers, nor plans to increase the software literacy of
        our entire organization.
      </P>
      <P>
        To top things off, we boast that we are now Agile. At a certain point,
        we have to stop and ask ourselves: are we that much different from the
        cargo culting natives? When we hire Agile coaches for the sole purpose
        of telling us how to work, how far have we come from the charismatic
        leaders maintaining cargo cults?
      </P>
      <P>
        In the end, Agile is a set of values and principles. To become Agile, we
        can’t just mimic superficial behaviors of successful organizations,
        thinking we’ll gain the same benefits. We’re not the same organization
        in terms of industry, workforce, product, and customers. And most
        importantly, we mustn’t underestimate the value of actually talking to
        our people — including our “average workers” — as part of the process.
      </P>
      <H2>{headings[4]}</H2>
      <P>
        We cargo cult in our everyday lives, as well as in the software
        industry.
      </P>
      <P>
        On realizing this, I strive to understand why I do and decide certain
        things as a developer. I also strive to be better at articulating my
        thought process. By doing this, I show others what I’ve taken into
        consideration, giving them a chance to point out what I’ve missed. All
        the companies we work for have cult-like characteristics to some degree.
        Every time I get a new colleague, I make it a habit to tell them not to
        be afraid of questioning things.
      </P>
      <P>
        On the flip side, cargo culting is not always bad. Life is complicated,
        and so is being a developer. Having to understand the whys behind
        everything we do is exhausting. Successful people and successful
        companies do a lot of things right, after all.
      </P>
      <P>
        The real danger lies in cargo culting far-reaching decisions that impact
        our lives, and our software. It lies in failing to realize and admit
        that we have, and in our unwillingness to gain a deeper understanding.
      </P>
      <H3>References</H3>
      <div className="text-sm">
        <P>
          {'"The Death of Microservice Madness in 2018"'}, and its discussion on
          Hacker News:
        </P>
      </div>
      <UlReferences>
        <li>
          <Link
            href="https://dwmkerr.com/the-death-of-microservice-madness-in-2018/"
            external
          />
        </li>
        <li>
          <Link href="https://news.ycombinator.com/item?id=16200007" external />
        </li>
      </UlReferences>
      <div className="text-sm">
        <P>
          Martin Fowler, one of the creators of The Agile Manifesto, comments on
          the state of agile in 2018:
        </P>
      </div>
      <UlReferences>
        <li>
          <Link
            href="https://martinfowler.com/articles/agile-aus-2018.html"
            external
          />
        </li>
      </UlReferences>
    </ArticleLayout>
  );
}
