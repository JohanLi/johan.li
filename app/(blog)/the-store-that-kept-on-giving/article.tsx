import Code from '../components/article/Code'
import { CodeInline, H2, P, Ul } from '../components/article/Common'
import ImageFloat from '../components/image/ImageFloat'
import oprahMeme from './oprah-meme.jpg'
import sfccCartoon from './salesforce-commerce-cloud-cartoon.png'

const headings = [
  'A shiny brand-new store',
  'How Steam keys were sent out',
  'Rolling your own rollover',
  'A hacky solution',
  'The morning after',
]

const js1 = `
function createDelayOrderDate(orderCreateDate : Date)
{
    var year = orderCreateDate.getUTCFullYear();
    var month = orderCreateDate.getUTCMonth() + 1;
    var day = orderCreateDate.getUTCDate();
    var hours = orderCreateDate.getUTCHours();
    var mins = orderCreateDate.getUTCMinutes();

    var adyenDelayMin : Number = 1;
    if (!empty(dw.system.Site.getCurrent().getCustomPreferenceValue("AdyenNotificationDelayMinutes"))) {
        adyenDelayMin = dw.system.Site.getCurrent().getCustomPreferenceValue("AdyenNotificationDelayMinutes");
    }
    var delayMins : dw.util.BigInteger = dw.util.BigInteger(adyenDelayMin);
    var hoursDelay : dw.util.BigInteger = delayMins.divide(60);
    var hoursDelayNumber = hoursDelay.get();

    var resultDelayMins : Number = 0;
    var resultMonthDelay : Number = 0;
    var resultHoursDelay : Number = 0;
    var resultDayDelays : Number = 0;
    var resultYearDelay : Number = 0;

    if (hoursDelayNumber == 0) {
        resultDelayMins = mins + delayMins.get();
    } else {
        resultDelayMins = mins + (delayMins - (hoursDelayNumber * 60));
    }

    if (resultDelayMins >= 60) {
        hoursDelayNumber++;
        resultDelayMins = resultDelayMins - 60;
    }

    if ((hours + hoursDelayNumber) >= 24) {
        resultDayDelays = 1;
        resultHoursDelay = (hours + hoursDelayNumber) - 24;
    } else {
        resultHoursDelay = hours + hoursDelayNumber;
    }

    if ((day + resultDayDelays) > 31) {
        resultMonthDelay = 1;
        resultDayDelays = (day + resultDayDelays) - 31;
    } else {
        resultDayDelays = day + resultDayDelays;
    }

    if ((month + resultMonthDelay) > 12) {
        resultYearDelay = year + 1;
        resultMonthDelay = (month + resultMonthDelay) - 12;
    } else {
        resultMonthDelay = month + resultMonthDelay;
        resultYearDelay = year;
    }

    var newDateString : String = resultYearDelay + "-" + pad(resultMonthDelay) + "-" + pad(resultDayDelays) + " " + pad(resultHoursDelay) + ":"
        + pad(resultDelayMins) + ":" + pad( orderCreateDate.getUTCSeconds() );
    var cal  = new dw.util.Calendar();
    Logger.getLogger("Adyen", "adyen").debug("order delay timestring " + newDateString);
    cal.parseByFormat(newDateString, "yyyy-MM-dd HH:mm:ss");
    var newDate = cal.time;
    return newDate;
}

function pad ( num : Number ) {
    if ( num < 10 ) {
        return '0' + num;
    }
    return num;
}
`

const js2 = `
function execute(pdict) {
    processNotifications(pdict);
    clearNotifications(pdict);
    return PIPELET_NEXT;
}

function processNotifications(pdict) {
    var searchQuery = CustomObjectMgr.queryCustomObjects(
        "adyenNotification",
        "custom.updateStatus = 'PROCESS'",
        null
    );
    
    while (searchQuery.hasNext()) {
        customObj = searchQuery.next();
        Transaction.wrap(function () {
            /*
              The following method calls createDelayOrderDate(). Custom code
              that sends out Steam keys was also added inside this method.
            */
            handlerResult = objectsHandler.handle(customObj);
        });
    }
}
`

const body = (
  <>
    <P>
      Minutes before midnight, something started happening. If you purchased
      games from a specific store, you’d get new copies every few minutes. By
      morning, the store had erroneously sent out 150,000 USD worth of Steam
      keys. The cause was poor software: a quick-and-dirty solution created the
      conditions, and a silly function acted as the trigger.
    </P>
    <P>This is a detailed recollection of what happened.</P>
    <H2>{headings[0]}</H2>
    <P>
      In 2017, I worked for a video game publisher. Following a successful year,
      we planned to go big on our e-commerce by launching a new store. It had to
      be ready by summer.
    </P>
    <P>
      To realize our plan, an agency would build it using Salesforce Commerce
      Cloud (SFCC). SFCC is a proprietary, enterprise-grade e-commerce platform
      built using Java. As its name suggests, it runs entirely on the cloud. A
      selling point is that you can write custom backend logic in JavaScript
      when calling classes such as Customer, Product, and OrderMgr. This is made
      possible by Rhino, an engine that compiles server-side JavaScript to Java.
    </P>
    <P>
      However, most of the “JavaScript” is Demandware Script, a proprietary
      language based on the abandoned ECMAScript 4. While rhinos are cool, the
      actual engine’s the polar opposite of “blazing fast.” And it still doesn’t
      support ES2015, even in 2022.
    </P>
    <ImageFloat
      data={sfccCartoon}
      width={300}
      alt="One of many cartoons on SFCC’s homepage."
      right
    />
    <P>
      From the outset, as the name SFCC also suggests, it was clear we had
      stepped into a world catered to non-technical businesses: a homepage laden
      with buzzwords and cartoons, documentation behind customer login, and
      close to no hits across popular developer communities (including when
      searching for Demandware, its name before acquisition).
    </P>
    <H2>{headings[1]}</H2>
    <P>The flow of sending out Steam keys was a simple one:</P>
    <Ul>
      <li>Orders are created</li>
      <li>
        On successful payments, our provider Adyen sends notifications to a
        webhook endpoint
      </li>
      <li>A cron job runs every 5 minutes, processing notifications</li>
      <li>Each notification is matched against an order</li>
      <li>For each matched order, an API is called to send out Steam keys</li>
    </Ul>
    <H2>{headings[2]}</H2>
    <P>
      There’s a catch: not all notifications get processed. If their matched
      order is fresher than X minutes, the cron job defers processing until the
      next run. (I believe it’s intended to minimize race conditions.)
    </P>
    <P>
      How would you implement this logic? Do it at the query level, joining
      notifications with orders? Get the Unix time of an order, add X * 60, and
      compare it with the current time? Look into whatever methods Date might
      provide us to add X minutes?
    </P>
    <P>
      Neither. We’ll deconstruct the order’s Date into year, month, day, hour,
      and minute. We’ll then add X minutes, handle the rollovers ourselves, and
      stitch them together to create a Date object. What could go wrong?
    </P>
    <Code
      language="javascript"
      code={js1}
      caption="From Adyen’s open-source Salesforce Commerce Cloud plugin back in 2017."
    />
    <P>
      The code from Adyen’s plugin assumed months always have 31 days. It
      contained off-by-one bugs: hour 24 was possible, and as was minute 60. You
      could end up with something as wild as 2022-02-31 24:60:59.
    </P>
    <H2>{headings[3]}</H2>
    <P>
      That fateful summer night, a customer made a purchase at 23:58. This
      crashed the cron job as the script tried parsing 24:01 using{' '}
      <CodeInline>dw.util.Calendar()</CodeInline>. But how did this cause the
      next customers to repeatedly get Steam keys?
    </P>
    <P>
      The agency implemented the functionality of sending out keys by making
      direct changes to Adyen’s plugin. While it’s bad practice, it’s a
      convenient approach: it’s easy, and you don’t need to understand SFCC in
      depth.
    </P>
    <P>
      As it turned out, the same loop that processes a notification doesn’t
      remove it — all notifications are processed first. If any notification
      causes a crash, the cron job doesn’t delete any of them. Additionally, by
      not specifying a sorting order, the job looped through the newest
      notifications first.
    </P>
    <Code
      language="javascript"
      code={js2}
      caption="An excerpt of what the cron job ran."
    />
    <P>
      As orders came in throughout the night, the cron job processed more and
      more notifications before reaching the crashing one. Every five minutes,
      customers who purchased after 23:58 received new keys.
    </P>
    <P>
      In Adyen’s defense, their plugin does have a failsafe in setting a
      property flag when looping through notifications. But since I neither have
      a copy of the modified plugin nor have access to SFCC’s runtime, I don’t
      know why it didn’t kick in. My best guess is that all the previous
      notifications’ flags got rolled back once the crash occurred.
    </P>
    <H2>{headings[4]}</H2>
    <P>
      Arriving at work, I began investigating why a customer who’d made a
      purchase before midnight still hadn’t received their Steam keys. Soon
      afterward, I realized what had happened. We reached out to the agency and
      started revoking Steam keys.
    </P>
    <P>
      We were lucky. Had this incident occurred during a large weekend sale,
      it’s not hard to imagine it being 50 times worse. Most importantly, none
      of the customers appeared to have resold any keys. Similar to profiting
      off stolen credit cards, bad actors could’ve taken advantage by offloading
      soon-to-be revoked keys.
    </P>
    <P>
      While many things can be said — piggybacking on Adyen’s plugin, the
      rollover logic, the necessity of the cron job to begin with — it was a
      mistake not to set and check a flag specifically tied to calling the API.
      On the API side, an idempotency key might’ve also helped. But unless you
      base it on order ID, each run would’ve likely just generated new keys
      considering how everything else was implemented.
    </P>
    <P>
      As customers, we encounter bugs from time to time. Whenever I do, I think
      back to this and wonder if something as silly had triggered them.
    </P>
  </>
)

export const article = {
  thumbnail: oprahMeme,
  title: 'The store that kept on giving',
  teaser:
    'How an e-commerce store sent out 150,000 USD-worth of Steam keys in error.',
  published: 1669754004,
  readingTime: 5,
  headings,
  body,
}
