import React, { ReactElement } from 'react';

import Image from '../../components/Image';

import vanuatu from './vanuatu.jpg';
import vanuatuLarge from './vanuatu-large.jpg';
import microservices from './microservices.png';
import agile from './agile.png';
import agileLarge from './agile-large.png';

const Index = (): ReactElement => (
  <div>
    <h1>Cargo Culting in Software</h1>
    <p>
      In everyday life, we do certain things. Decide certain things. Not always
      because we understand why, but because people who are successful — people
      who we look up to — appear to be doing it. In the world of software, this
      phenomenon is called cargo culting.
    </p>
    <p>
      How and where did this strange term originate? What are some examples of
      cargo culting in the software industry? If it does occur, should we as
      developers embrace a certain mindset? And is cargo culting necessarily a
      bad thing?
    </p>
    <h2>Origin</h2>
    <p>
      The term has its roots in World War II. The Allies deployed troops to
      islands in the Pacific Ocean, establishing airbases. Planes regularly flew
      over them, dropping cargo as the natives watched in astonishment. What is
      going on? All this technology. All these changes to the surroundings. Food
      and equipment, falling from the skies?
    </p>
    <Image
      src={vanuatu}
      srcWidth={800}
      srcHeight={531}
      zoomSrc={vanuatuLarge}
      caption="Vanuatu, an island country in the Pacific Ocean, has a cargo cult that survives to this day."
    />
    <p>
      The troops abandoned the islands after the war. No more cargo dropped. But
      some natives, in an attempt to get cargo to drop again, tried to restore
      their surroundings. They built fabricated control towers and replicas of
      airplanes. They paraded, carrying wooden rifles, and stood on runways,
      waving tree branches.
    </p>
    <p>
      They fell into the trap of confusing correlation with causation and formed
      a cult — a cargo cult.
    </p>
    <h2>In Software</h2>
    <p>
      In software, cargo culting can come in many different shapes and forms.
      Sometimes, we copy-paste from Stack Overflow without understanding what
      the snippet of code is doing. Occasionally, we run cryptic terminal
      commands in an attempt to solve problems we don’t understand. We follow
      conventions, patterns, and principles, yet are unable to explain why some
      of them exist.
    </p>
    <p>
      But beyond the individual lines of code, cargo culting can also affect
      applications and even organizations at large. Two such examples are
      microservices and Agile.
    </p>
    <h2>Microservices</h2>
    <p>
      A piece of software starts small. As time goes on, features get added.
      More use cases need to be supported, and the codebase gets larger. To
      manage the growth in complexity, we separate concerns and modularize our
      code.
    </p>
    <p>
      So the appeal of microservices is apparent. You have small and independent
      components that can be created and maintained by small and independent
      teams. They can also be deployed and scaled independently. Because they’re
      small and specific, it’s easier to make them reusable. Besides, Amazon and
      Netflix are using microservices, and they’re successful. It would be
      reasonable to assume that if we use microservices, we’ll be successful,
      too, right?
    </p>
    <Image
      src={microservices}
      srcWidth={800}
      srcHeight={240}
      caption="A monolith split into microservices."
    />
    <p>
      In reality, we’re making considerable tradeoffs. What if we need to work
      on a feature that spans multiple services? Do we still benefit much from
      having independent components and teams? How do we orchestrate, monitor,
      and troubleshoot all our services? While great tools exist nowadays, they
      are still tools we need to know about and know how to use well. In other
      words, adopting microservices requires serious expertise.
    </p>
    <p>
      At the same time, having a monolith doesn’t stop us from modularizing our
      code. We intend to adopt microservices because the monoliths we’ve worked
      on always turn out “messy.” If that’s the case, are we sure we’ll do a
      good job splitting our monolith? If we struggle managing a single, albeit
      larger, service, will things get better with microservices? Will we end up
      with an even more complex monolith that we pretend are microservices?
    </p>
    <p>
      Microservices are great and solve real problems. Otherwise, Amazon and
      Netflix wouldn’t be using them. But we have to take the time to understand
      these organizations and look ourselves in the mirror. Do we share the same
      challenges, and do we have the resources? Does it make sense to use
      microservices right now?
    </p>
    <p>
      It’s also worth asking ourselves the tough questions. Are we adopting
      microservices because we’re skirting around actual problems? Problems with
      communication and cooperation? Have we hired too many developers who chase
      shiny objects? Is there a lack of technical leadership? Are people making
      abrupt decisions when they come back from tech conferences?
    </p>
    <p>
      These are questions we must answer. If we don’t, we might end up in a
      scenario where four developers are working at a startup with a product in
      a state of flux, maintaining ten poorly bounded microservices. Too busy
      dealing with self-imposed problems, to be delivering value to end users.
    </p>
    <h2>Agile</h2>
    <p>
      Creating software requires coordination and collaboration. A term that
      gets brought up in this context is Agile: we’re an Agile organization, we
      do Agile software development, we’re Agile. It’s brought up so often, in
      different settings, that once in a while, we have to look up what Agile
      is.
    </p>
    <Image
      src={agile}
      srcWidth={800}
      srcHeight={285}
      zoomSrc={agileLarge}
      caption="Colleagues gathering around a Scrum Board."
    />
    <p>
      Agile was born in response to the ideas of Frederick Taylor. He was one of
      the most influential figures of the 20th century, having improved
      industrial efficiency. He viewed the average worker as uneducated and
      lazy. So you get intelligent people and pay them more, to figure out how
      the workers should work. This thinking was also prevalent in the software
      industry.
    </p>
    <p>
      But having separate process people doesn’t lend itself well to software
      development. We’re knowledge workers. We’re well educated and well paid.
      Our work is highly contextual, seeing as software solves a wide array of
      problems in all kinds of organizations, industries, and countries. Hence,
      a pillar of Agile is letting actual workers decide how they work,
      adjusting as they go along: “Individuals and Interactions over processes
      and tools.”
    </p>
    <p>
      Another aspect of software development is the challenge in gathering
      requirements and planning long-term. This ties into two other pillars of
      Agile: “Responding to Change over following a plan” and “Working Software
      over comprehensive documentation.” What’s not so apparent at first glance,
      is that these two things also require a high degree of technical know-how,
      similar to microservices. To respond to change and have working software,
      we need developers who understand how to write modular code. Developers
      who understand the importance of refactoring often. Developers who
      understand continuous integration and how to write tests. And last but not
      least, our organization as a whole needs to understand this.
    </p>
    <p>
      Yet, we enforce a one-size-fits-all process in our organization. We rename
      project managers “scrum masters” and stakeholders “product owners.” We
      rename our meetings “stand-ups,” buy planning poker decks, and start using
      the word “sprints.” While this is going on, the command and control
      mindset still permeates our organization. Hierarchies in communication
      remain. We continue viewing our developers as assembly line workers. We
      have neither plans to raise the technical skills of our developers, nor
      plans to increase the software literacy of our entire organization.
    </p>
    <p>
      To top things off, we boast that we are now Agile. At a certain point, we
      have to stop and ask ourselves: are we that much different from the cargo
      culting natives? When we hire Agile coaches for the sole purpose of
      telling us how to work, how far have we come from the charismatic
      individuals maintaining cargo cults?
    </p>
    <p>
      Agile exists for a reason. But becoming Agile is hard. We can’t just mimic
      superficial behaviors of other successful organizations and think we’ll
      gain the same benefits. First off, it’s hard to tell how much Agile
      contributed to their success. Secondly, and most importantly, we’re not
      the same organization.
    </p>
    <p>
      In the end, Agile is a set of values and principles. To best apply them,
      we have to understand what type of organization we are, what industry we
      work in, and what products and customers we have. Last but not least, we
      mustn’t underestimate the value of actually talking to our people —
      including our “average workers.”
    </p>
    <h2>Thoughts</h2>
    <p>
      We cargo cult in our everyday lives, as well as in the software industry.
    </p>
    <p>
      On realizing this, I strive to understand why I do and decide certain
      things as a developer. I also strive to be better at explaining my
      reasoning. By doing this, I show others what I’ve taken into
      consideration, giving them a chance to point out what I’ve missed. All the
      companies we work for have cult-like characteristics to some degree.
      Hence, every time I get a new colleague, I make it a habit to tell them
      not to be afraid of questioning things.
    </p>
    <p>
      On the flip side, cargo culting is not always bad. Life is complicated,
      and so is being a developer. Having to understand the whys behind
      everything we do is exhausting. Successful people and successful companies
      do a lot of things right, after all.
    </p>
    <p>
      The real danger lies in cargo culting far-reaching decisions that impact
      our lives, and our software. It lies in failing to realize and admit that
      we have, and in our unwillingness to gain a deeper understanding.
    </p>
  </div>
);

export default Index;
