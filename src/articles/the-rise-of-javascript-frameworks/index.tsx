import { H2, P } from '../../components/article/Common'
import Image from '../../components/image/Image'
import Code from '../../components/article/Code'
import { Article } from '../../components/article/articleTypes'

import angularReactVueTrends from './angular-react-vue-trends.png'
import barebonesMessagingApp from './barebones-messaging-app.png'

const headings = [
  'From pages to applications',
  'What’s different about an application?',
  'A bare-bones messaging app',
  'Amount of code vs. amount of re-rendering',
  'The powerful abstraction of Angular, React, and Vue',
]

const html1 = `
<div class="messages">
  {{#each messages}}
    <div class="message">
      {{#if displayAuthor}}
        <div class="author-name">
          {{authorName}}
        </div>
      {{/if}}
      <div class="content">
        {{content}}
      </div>
    </div>
  {{/each}}
</div>
`

const html2 = `
<div class="messages">
  <div class="message" data-author-id="4">
    <div class="author-name">
      Bill
    </div>
    <div class="content">
      good morning
    </div>
  </div>
  <div class="message" data-author-id="12">
    <div class="author-name">
      Steve
    </div>
    <div class="content">
      hey man
    </div>
  </div>
  <div class="message" data-author-id="4">
    <div class="author-name">
      Bill
    </div>
    <div class="content">
      how’re things going?
    </div>
  </div>
  <div class="message" data-author-id="4">
    <div class="content">
      heard the new iPhone’s going well
    </div>
  </div>
</div>
`

const js1 = `
function updateMessages(html) {
  document.querySelector('.messages').outerHTML = html;
}
`

const javascript1 = `
function addMessage(html) {
  const messagesElement = document.querySelector('.messages');
  messagesElement.insertAdjacentHTML('beforeend', html);

  const messages = document.querySelectorAll('.message');

  const addedMessage = messages[messages.length - 1];
  const previousMessage = addedMessage[messages.length - 2];

  if (
    previousMessage?.getAttribute('data-author-id') ===
    addedMessage.getAttribute('data-author-id')
  ) {
    addedMessage.querySelector('.author-name').remove();
  }

  if (messages.length > 20) {
    const oldestMessage = messages[0];
    const newOldestMessage = messages[1];

    if (
      oldestMessage.getAttribute('data-author-id') ===
      newOldestMessage.getAttribute('data-author-id')
    ) {
      const authorElement = oldestMessage.querySelector('.author-name').outerHTML;
      newOldestMessage.insertAdjacentHTML('afterbegin', authorElement);
    }

    oldestMessage.remove();
  }
}

addMessage(\`
  <div class="message" data-author-id="4">
    <div class="author-name">
      Bill
    </div>
    <div class="content">
      are you there?
    </div>
  </div>
\`);
`

const javascript2 = `
const initialMessages = [
  {
    id: 25,
    authorId: 4,
    authorName: 'Bill',
    content: 'good morning',
  },
  {
    id: 26,
    authorId: 12,
    authorName: 'Steve',
    content: 'hey man',
  },
  {
    id: 28,
    authorId: 4,
    authorName: 'Bill',
    content: 'how’re things going?',
  },
  {
    id: 29,
    authorId: 4,
    authorName: 'Bill',
    content: 'heard the new iPhone’s going well',
  },
];

const newMessage = {
  id: 30,
  authorId: 4,
  authorName: 'Bill',
  content: 'are you there?',
};

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // on initial messages and new messages
    // setMessages(messages.concat(newMessage).slice(-20));
  }, []);

  return <Messages messages={messages} />
};

const Messages = ({ messages }) => (
  <div className="messages">
    {messages.map((message, i) => {
      let author;

      if (messages[i - 1]?.authorId !== message.authorId) {
        author = <div className="author-name">{message.authorName}</div>;
      }

      return (
        <div key={message.id} className="message">
          {author}
          <div>
            {message.content}
          </div>
        </div>
      );
    })}
  </div>
);
`

const body = () => (
  <>
    <P>
      Google released <strong>Angular</strong> in 2010. It marked the start of a
      revolution in web development, giving a rapid rise to the popularity of
      JavaScript frameworks. In addition to Angular, <strong>React</strong>,
      released by Facebook, and <strong>Vue</strong>, together dominate this
      space.
    </P>
    <Image
      src={angularReactVueTrends}
      width={800}
      height={230}
      alt="Google Trends for the search terms “angular js”, “react js” and “vue js”."
    />
    <P>
      While having the backing of Google and Facebook certainly helps, what
      sparked it? Is there something fundamentally different about the web
      today? What types of problems are these JavaScript frameworks solving?
    </P>
    <H2>{headings[0]}</H2>
    <P>
      When Tim Berners-Lee invented the World Wide Web in 1989, he envisioned
      websites serving documents in the form of HTML pages. Documents, although
      static, could link to each other through the use of anchor tags.
    </P>
    <P>
      The Internet took off. A browser war started brewing between Netscape and
      Internet Explorer. To gain the upper hand, Netscape introduced JavaScript
      in 1995, paving the way for dynamic behavior on HTML pages. Web developers
      could now implement drop-down menus, alert dialogs, and form validation.
    </P>
    <P>
      But a challenge remained. Sending a user action to the server, even the
      slightest, required them to load a new page. They lost context, and used
      excess bandwidth – a poor user experience altogether, in addition to
      putting unnecessary strain on the server.
    </P>
    <P>
      Browser vendors began working towards a solution, arriving at the{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest">
        XMLHttpRequest API
      </a>
      .
    </P>
    <P>
      One of the first websites to roll out a cross-browser implementation of it
      was Gmail when it launched in 2004. To delete an email, we no longer had
      to reload our inbox. And while the request was pending, our browser didn’t
      freeze up, giving us the freedom to view other emails.
    </P>
    <P>
      The following year, in 2005, this technique of not having to load a new
      page gained its name: Ajax (Asynchronous JavaScript and XML). All of a
      sudden, more and more static HTML pages came to life!
    </P>
    <P>
      In short, websites have become significantly more interactive over the
      years. They’ve gone from serving pages to serving so-called single-page
      applications. So, where does React, Vue, and Angular come into the
      picture? As it turns out, building applications involve a set of
      challenges.
    </P>
    <H2>{headings[1]}</H2>
    <P>
      The first difference between a page and an application lies in the
      necessity of keeping track of <strong>state</strong>. When visiting a
      page, a user’s session (stored in a cookie) and requested URL is enough.
      Neither of those even need JavaScript.
    </P>
    <P>
      In an application, particularly a single-page one, we need to store more
      information locally. Is the user logged in? What is their name and the URL
      to their profile picture? What data have we loaded from an API? Are we
      still loading that data? Are they viewing a profile page right now, and
      whose?
    </P>
    <P>
      The second difference involves the need to modify existing HTML whenever
      the state changes. When browsers load HTML, they create and provide
      programmatic access to a tree structure called the DOM (Document Object
      Model). <strong>DOM manipulations</strong> come at a cost as the browser
      needs to re-render content.
    </P>
    <P>
      With these two differences in mind, let’s demonstrate how we’d create a
      bare-bones chat application without a JavaScript framework. Focusing only
      on the essential parts, we’ll go through different approaches and discuss
      their challenges.
    </P>
    <H2>{headings[2]}</H2>
    <Image
      src={barebonesMessagingApp}
      width={410}
      height={310}
      alt="A bare-bones chat application."
    />
    <P>
      Imagine we’re creating a chat application, showing the last 20 messages.
      Users can post new ones, and for successive messages of the same author,
      we omit their names.
    </P>
    <P>
      If we chose not to create it as an application, we’d have the server
      return the entire chat:
    </P>
    <Code
      language="handlebars"
      code={html1}
      caption="The template used by the server to generate the HTML."
    />
    <P>
      It carries several drawbacks: the server sends redundant data, users need
      to refresh to see updates, and the browser has to render everything for
      every update.
    </P>
    <P>
      In the first version of our application, we introduce some JavaScript that
      listens to updates from the server. To keep our client simple, it will
      receive updates as an HTML string containing all messages, including old
      ones. Here’s how the DOM manipulation code looks like:
    </P>
    <Code
      language="javascript"
      code={js1}
      caption="(First version) A straightforward way to prevent having to refresh the browser."
    />
    <P>
      Although trivial to implement, we’ve only eliminated the drawback of
      having to refresh. The entire element containing all messages is still
      re-rendered on every new message.
    </P>
    <P>
      For version two, we make some improvements to the server, so it, in
      addition to the initial HTML, sends new messages individually. The server
      also adds attributes to the HTML it outputs, allowing our client to
      distinguish between authors:
    </P>
    <Code
      language="html"
      code={html2}
      caption="(Second version) The initial HTML output by the server, containing author IDs."
    />
    <P>
      For subsequent messages, the client will add and keep them to 20 at most,
      while handling author names:
    </P>
    <Code
      language="javascript"
      code={javascript1}
      caption="(Second version) The code on the client that adds a message from the server."
    />
    <P>
      By adding some code, we’ve minimized the amount of re-rendering needed for
      each new message. Although the server still sends redundant data, we can
      move the templating logic to the client with relative ease.
    </P>
    <H2>{headings[3]}</H2>
    <P>
      The chat application we’ve created is indeed bare-bones – it has no
      support for edits, deletions, emojis, rich text, reactions, and replying
      in a thread.
    </P>
    <P>
      As we saw in the second version of our application, to reduce re-renders,
      we had to write code to transform the DOM. If we were to implement a
      feature-rich chat, we would end up with copious amounts of code.
    </P>
    <P>
      Another important aspect is that the code we’ve written is{' '}
      <strong>imperative</strong>. It describes <strong>how</strong> new
      messages are added and how the DOM is traversed to handle author names.
    </P>
    <P>
      Creating a web application this way, while minimizing unnecessary
      re-renders and keeping the codebase maintainable, is challenging as it
      grows in complexity.
    </P>
    <H2>{headings[4]}</H2>
    <P>
      What JavaScript frameworks solve is allowing us to express HTML
      transformations in a <strong>declarative</strong> way. Instead of
      describing how they are carried out, we describe <strong>what</strong> the
      HTML will be in different circumstances. The framework will then, under
      the hood, determine an{' '}
      <strong>efficient way of manipulating the DOM</strong> and carry it out.
    </P>
    <P>
      Below is how we could implement the same chat application using React:
    </P>
    <Code
      language="jsx"
      code={javascript2}
      caption="Parts of the chat implemented in React. Notice how we’re not transforming any HTML."
    />
    <P>
      What stands out is that we no longer have code that describes how to
      change the HTML. Instead, React requires us to define what variables make
      up the state. In our case, the state is simply the messages array.
    </P>
    <P>
      Further, React requires us to describe how the state maps to HTML. React
      also wants us to be explicit about state changes (through calling
      setMessages) to know when to check for and perform the necessary DOM
      manipulations.
    </P>
    <P>
      In other words, we{' '}
      <strong>express the HTML as a pure function of the state</strong>. The
      only transformations left to us are those applied to simple data
      structures. While our chat application might currently be too simple for
      it to be apparent – as we add more features, we’ll notice that this
      approach produces code that is easier to grok.
    </P>
  </>
)

const article: Article = {
  thumbnail: angularReactVueTrends,
  teaser: `
    When starting a web application, we tend to — without second thought — pick from one of three frameworks.
    But what fundamental problems are these popular frameworks solving?
  `,
  title: 'The rise of JavaScript frameworks',
  published: 1597562075,
  readingTime: 8,
  headings,
  body,
}

export default article
