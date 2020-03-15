import React, { ReactElement } from 'react';

import Image from '../../components/Image';
import tBarLift from './t-bar-lift.jpg';
import tBarLiftLarge from './t-bar-lift-large.jpg';
import { Metadata } from '../articles';

export const metadata: Metadata = {
  title: 'Being considerate',
  published: 1580515200,
  readingTime: 3,
};

const Index = (): ReactElement => (
  <div>
    <p>
      Two unusual things happened. I was riding a ski lift. And my lift
      companion, a kid, said something that will stay with me for a long time.
    </p>
    <h2>Skiing and I</h2>
    <p>
      Despite growing up in Sweden, I never learned how to ski until last
      winter. While it may sound strange, skiing has a symbolic meaning to me.
      Growing up, I felt different. I was different: a Chinese immigrant
      speaking English, attending a Swedish school in an affluent neighborhood.
      Every winter, my classmates went skiing while I stayed home. And so,
      skiing came to represent the lack of belonging I experienced.
    </p>
    <p>
      As an adult, I’ve made a conscious effort to experience the things I
      missed. Picking up skiing as a hobby is a part of that. With snow arriving
      early this winter, I traveled to a ski resort called Åre.
    </p>
    <h2>T-bar lifts</h2>
    <p>
      Due to strong winds, the chairlift I intended to ride was non-operational.
      I headed towards a different area. Here, they operated a T-bar, a type of
      lift I hadn’t used before.
    </p>
    <Image
      src={tBarLift}
      srcWidth={800}
      srcHeight={450}
      zoomSrc={tBarLiftLarge}
      caption=""
    />
    <p>
      That day, I learned that T-bars work best if you ride with someone of
      similar height. You’re supposed to place the bar underneath your butt and
      lean against it, as it pushes you up the hill. But when riding with a kid,
      the bar ends up knee-level, and you’ll be in for an uncomfortable ride.
    </p>
    <p>
      I also learned how inviting these lifts are to conversations. For five
      minutes, you stand side-by-side with a stranger. Peaceful nature surrounds
      you, and it’s impractical to fiddle with your phone.
    </p>
    <h2>The interaction</h2>
    <p>
      Day two, while queuing, I realize a little girl will be my next lift
      companion. Judging by her appearance, she hasn’t turned ten yet. We
      receive a helping hand from the lift operator, as we lean on the T-bar.
      Knee-level for me, right level for her. As the bar pushes us forward, she
      turns and looks at me.
    </p>
    <p>
      <strong>“Would you like it a little higher?”</strong>
    </p>
    <p>
      I’m astonished. For one, I rarely encounter kids on lifts who interact.
      And perhaps it’s due to my lack of experience with them in general, but
      the degree of thoughtfulness she showed with just a few words surprised
      me. Plus, the fluency in which she spoke English, reminded me of myself as
      a child.
    </p>
    <p>
      Continuing up the hill, I find out she’s here to attend a training camp.
      Realizing I speak Swedish, she tells me she spoke English at first as
      international tourists frequent the resort.
    </p>
    <p>
      As we part ways, I tell her, “I like that you asked. That was very
      considerate of you!”.
    </p>
    <p>“Thanks!”</p>
    <h2>The ride home</h2>
    <p>
      A few days later, on the train back home, I thought about my progress as a
      skier. I thought about all the proud parents who had sent their kids to
      the training camp. I thought about how tired my legs were.
    </p>
    <p>
      But most of all, I kept thinking about that interaction. It resonated with
      me — we need to remind ourselves to be considerate. In many instances,
      it’s something that doesn’t require much. It’s the little things, as we
      say.
    </p>
    <p>
      This winter, I’ll be skiing more. I want to get better. Someday, when I
      have kids, I’ll teach them how to ski so they won’t feel as different
      growing up. And as they grow up, I hope I’ll be able to raise them as well
      as the parents of this girl have.
    </p>
  </div>
);

export default Index;
