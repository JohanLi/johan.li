import React, { ReactElement } from 'react';

const Index = (): ReactElement => (
  <div>
    <h1>Cargo Culting in Software</h1>
    <p>
      In everyday life, we do certain things. Decide certain things. Not always
      because we understand why, but because people who are successful – people
      who we look up to – appear to be doing it. In the world of software, this
      phenomenon is called cargo culting.
    </p>
    <p>
      How and where did this strange term originate? What are some examples of
      cargo culting in the software industry? If it is a thing that occurs, what
      mindset should we embrace? And is cargo culting necessarily a bad thing?
    </p>
    <h2>Origin</h2>
    <p>
      The term has its roots in World War II. The Allies deployed troops to
      islands in the Pacific Ocean, establishing airbases. Planes regularly flew
      over them, dropping cargo as the natives watched in astonishment. What in
      the world is going on? All this technology. All these changes to the
      surroundings. Food and equipment, falling from the skies?
    </p>
    <p>
      The troops abandoned the islands after the war. No more cargo dropped. But
      some natives, in an attempt to get cargo to drop again, tried to restore
      their surroundings. They built fabricated control towers and replicas of
      airplanes. They paraded, carrying wooden rifles, and stood on runways,
      waving tree branches. They had formed a cult – a cargo cult.
    </p>
    <p>
      See, they had fallen into the trap of confusing correlation with
      causation. As humans, we’re good at social learning. We take on behaviors
      by observing others and through being told things, even in the absence of
      direct reinforcement.
    </p>
    <h2>In Software</h2>
    <p>
      In software, cargo culting can come in many different shapes and forms.
      Copy-pasting from Stack Overflow, without understanding what the snippet
      of code is doing. Running obscure commands and shell scripts.
      Overzealously following conventions, patterns, and principles.
    </p>
    <p>
      But beyond the individual lines of code, cargo culting can also affect our
      applications and even organizations at large. Let’s discuss two such
      examples: microservices and Agile.
    </p>
    <h2>Microservices</h2>
    <p>
      Features get added to our application. More and more use cases need to be
      supported. Its code base grows. To manage the growth in complexity, we
      separate concerns and modularize our code.
    </p>
    <p>
      So the appeal of microservices is apparent. You have small, independent
      components that can be created and maintained by small and independent
      teams. They can be deployed and scaled independently. Because they’re
      small and specific, it’s easier to make them reusable. Besides, Amazon and
      Netflix are using microservices, and they’re successful. It would be
      reasonable to assume that if you use microservices, you’ll be successful,
      too, right?
    </p>
    <p>
      In reality, you’re making considerable tradeoffs. What if you need to work
      on a feature that spans multiple services? Do you still benefit much from
      having independent components and teams? How do you orchestrate, monitor,
      and troubleshoot your services? While there are great tools nowadays,
      those are still tools you need to know about and know how to use well.
      Adopting microservices is not a cakewalk. You need serious expertise.
    </p>
    <p>
      At the same time, nothing is stopping you from modularizing code in a
      monolith. You intend to adopt microservices because the monoliths you’ve
      worked on always turn out “messy.” If that’s the case, what makes you
      think you’ll do a good job splitting your monolith? If you struggle with
      managing a monolith, will things get easier with microservices? Are you
      sure you’ll not end up with an even more complex monolith, disguised as
      microservices?
    </p>
    <p>
      Microservices are great and solve real-world problems. Otherwise, Amazon
      and Netflix wouldn’t be using them. But we have to take the time to
      understand these organizations and their use cases. Then look ourselves in
      the mirror, asking questions. Does it make sense for us, and does it make
      sense for us right now? What is our product? Do we have enough developers,
      and do they have the necessary skills? Are we prepared to acquire those
      skills? Are we, as an organization, capable of attracting and retaining
      such talent?
    </p>
    <p>
      It’s also worth asking ourselves the tough questions. Are we adopting
      microservices because we’re skirting around actual problems? Problems with
      communication and cooperation? Have we hired too many developers who chase
      shiny objects? Is there a severe lack of technical leadership? Are
      non-technical people making abrupt top-down decisions, when they come back
      from conferences?
    </p>
    <p>
      These are questions we must answer. If we don’t do our homework, we’ll end
      up losing more than we gain from microservices. We’ll be too busy shooting
      ourselves in the foot, to be delivering value to our end users.
    </p>
    <h2>Agile</h2>
    <p>
      Creating software requires coordination and collaboration. A term that
      gets brought up in this context is Agile. We’re an Agile organization. We
      do Agile software development. We’re Agile. It’s brought up so often, in
      different settings by different people, that every once in awhile, we have
      to look up what it is.
    </p>
    <p>
      Agile was born in response to the ideas of Frederick Taylor. He was one of
      the most influential figures of the 20th century, having improved
      industrial efficiency. He viewed the average worker as uneducated and
      lazy. So you get intelligent people and pay them more, to figure out how
      the workers should work. This thinking was also prevalent in the software
      industry.
    </p>
    <p>
      However, having separate process people doesn’t lend itself well to
      software development. We’re knowledge workers. We’re well educated and
      well paid. Our work is contextual, seeing as software is used to solve a
      wide array of problems. In all kinds of organizations, industries, and
      countries, to boot. Hence, one of the pillars of Agile is letting actual
      workers decide how they work, through evaluating and iterating.
      “Individuals and Interactions over processes and tools.”
    </p>
    <p>
      It’s often difficult to gather requirements and plan long-term when it
      comes to software. Two other pillars of Agile are “Responding to Change
      over following a plan” and “Working Software over comprehensive
      documentation.” What’s not so apparent at first glance, is that doing
      these two things requires a high degree of technical know-how, similar to
      the case with microservices. You need developers who understand how to
      write modular code and tests. Developers who understand the importance of
      refactoring often. Developers who understand continuous integration. And
      last but not least, your organization as a whole needs to understand this.
    </p>
    <p>
      Yet, we adopt a one-size-fits-all process in our organization. We rename
      Project Managers as Scrum Masters and stakeholders as Product Owners. We
      rename our meetings as stand-ups and buy planning poker decks.
    </p>
    <p>
      While this is going on, the command and control mindset still permeates
      our organization. We’re making top-down decisions. Hierarchies in
      communication remain. We continue viewing our developers as assembly line
      workers. There are no plans to raise their technical skills and no plans
      to improve the software literacy of our entire organization.
    </p>
    <p>
      To top things off, we boast that we are now Agile. After a certain point,
      we have to stop and ask ourselves: are we that much different from the
      cargo culting natives?
    </p>
    <p>
      Being Agile is hard. We can’t just mimic superficial behaviors of
      successful Agile organizations and think that we’ll gain the same
      benefits. Agile is a set of values and principles. How to best apply them
      depends, and we have to do our homework while looking at our organization,
      our products, and through talking to our people to figure it out.
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
      companies we work for, including those we found, have cult-like
      characteristics to some degree. Hence, every time I get a new colleague, I
      try to make it a habit to tell them not to be afraid of questioning
      things.
    </p>
    <p>
      On the flip side, cargo culting is not always a bad thing. Life is
      complicated, and so is being a developer. Having to understand why you do
      something all the time is exhausting. Successful people and successful
      companies do a lot of things right, after all. The real danger lies in
      cargo culting far-reaching decisions that impact our lives, and our
      software. It lies in failing to realize and admit that we are, and in our
      unwillingness to understand.
    </p>
  </div>
);

export default Index;
