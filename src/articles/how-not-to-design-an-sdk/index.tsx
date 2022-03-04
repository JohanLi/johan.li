import React from 'react';

import Image from '../../components/image/Image';
import {
  CodeInline,
  H2,
  H3,
  P,
  Quote,
  Title,
  UlReferences,
} from '../../components/article/Common';
import Link from '../../components/Link';
import Code from '../../components/article/Code';
import { Article } from '../../components/article/articleTypes';

import feelsBadMan from './feels-bad-man.png';
import npmInstallStart from './npm-install-start.png';
import excessiveInformation from './excessive-information.png';
import excessiveInformationLarge from './excessive-information-large.png';
import objectOrientedProgrammer from './object-oriented-programmer.png';
import objectOrientedProgrammerSmall from './object-oriented-programmer-small.png';
import ImageFloat from '../../components/image/ImageFloat';

const headings = [
  'Azure Blob Storage',
  'Is it about JavaScript or the actual SDK?',
  '"Object-oriented" programming',
  'A good SDK',
  'Opinions about the Java SDK',
  'In closing',
];

const js1 = `
const {
  SharedKeyCredential,
  StorageURL,
  ServiceURL,
  ContainerURL,
  BlockBlobURL,
  Aborter,
} = require('@azure/storage-blob');

const STORAGE_ACCOUNT_NAME = 'johanli';
const ACCOUNT_ACCESS_KEY = 'something';

const container = 'myWebsite';
const blobName = 'index.html';
const body = 'Hello, World!';

const credentials = new SharedKeyCredential(
  STORAGE_ACCOUNT_NAME,
  ACCOUNT_ACCESS_KEY,
);
const pipeline = StorageURL.newPipeline(credentials);

const serviceURL = new ServiceURL(
  \`https://\${STORAGE_ACCOUNT_NAME}.blob.core.windows.net\`,
  pipeline,
);
const containerURL = ContainerURL.fromServiceURL(serviceURL, container);
const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

/*
 To omit serviceURL and containerURL:
 
 const blockBlobURL = new BlockBlobURL(
  \`https://\${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/\${container}\`,
  pipeline,
);
 */

const aborter = Aborter.timeout(300000);

blockBlobURL.upload(aborter, body, body.length).then((response) => {
  console.log(response);
});
`;

const js2 = `
const AWS = require('aws-sdk');

const container = 'myWebsite';
const blobName = 'index.html';
const body = 'Hello, World!';

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: 'johanli',
    secretAccessKey: 'something',
  },
});

s3.upload({
  Bucket: container,
  Key: blobName,
  Body: body,
})
  .promise()
  .then((response) => {
    console.log(response);
  });
`;

const body = () => (
  <>
    <P>
      There’s enthusiasm in the air as we start exploring a new library. It’s
      maintained, and has a fair number of users. But frustration is about to
      set in.
    </P>
    <ImageFloat
      src={feelsBadMan}
      width={300}
      height={285}
      alt="FeelsBadMan"
      right
    />
    <P>
      The documentation takes forever to get to the relevant parts. The code
      examples? Talk about a worse signal-to-noise ratio. And once you
      scrutinize the code, things aren’t looking all too great.
    </P>
    <P>
      Enter the JavaScript SDK for Microsoft Azure’s Blob Storage. Particularly
      v10, which was the latest version until 2020. Its documentation doesn’t
      seem intended for developers, and its API is a textbook example of poor
      object-oriented programming.
    </P>
    <H2>{headings[0]}</H2>
    <P>
      Blob Storage, like Amazon S3, is a service used for serving static
      websites and storing media, backups, and raw data in general. Objects you
      upload are called Blobs, and a Blob belongs to a Container.
    </P>
    <P>
      Microsoft provides SDKs in a handful of languages, wrapping the underlying
      REST API. Every SDK comes with a Quickstart, serving as documentation.
    </P>
    <H2>{headings[1]}</H2>
    <P>
      Browsing the JavaScript SDK’s Quickstart, you need to scroll 50% through
      it before any real action happens.
    </P>
    <ImageFloat
      src={npmInstallStart}
      width={370}
      height={200}
      alt="Advanced concepts."
      right
    />
    <P>
      It starts by telling you how to clone a repo and manage environment
      variables. Then, the advanced concepts of{' '}
      <CodeInline>npm install</CodeInline> and{' '}
      <CodeInline>npm start</CodeInline> both have their own Heading 2. What
      follows are explanations of fs and path, how variable assignment works,
      and why a top-level async function is needed. An additional page or two
      later, we finally begin seeing snippets demonstrating how to create a
      Container and upload a Blob.
    </P>
    <P>
      I don’t want to sound ungrateful — I’d rather have this than nothing. But
      it wouldn’t be outlandish to assume that people seeking an SDK for a
      specific language have basic proficiency in it. It also strikes me as
      excessive to provide a line-by-line commentary of example code, intended
      to be simplistic in the first place.
    </P>
    <P>Show us concise code, and do that right out the bat.</P>
    <Image
      src={excessiveInformation}
      width={380}
      height={325}
      alt="v12’s Quickstart contains even more information that feels excessive."
      zoomSrc={excessiveInformationLarge}
    />
    <H2>{headings[2]}</H2>
    <P>
      Here’s a task for you: design an SDK for the Blob Storage. What is your
      ideal API for it? Remember, you want to be able to create Containers. You
      then want to be able to upload Blobs to them. Contemplate for a minute.
    </P>
    <P>
      In v10 of the JavaScript SDK, this is the minimal code for uploading a
      Blob to a Container:
    </P>
    <Code
      language="javascript"
      code={js1}
      caption="Minimal code for uploading a Blob to a Container."
    />
    <P>
      Where do we even begin? First off, the SDK is coded in TypeScript and is
      heavily object-oriented. Nothing inherently wrong with that.
    </P>
    <P>
      But read out loud the classes provided to us:{' '}
      <CodeInline>SharedKeyCredential</CodeInline>,{' '}
      <CodeInline>StorageURL</CodeInline>, <CodeInline>ServiceURL</CodeInline>,{' '}
      <CodeInline>ContainerURL</CodeInline>, and{' '}
      <CodeInline>BlockBlobURL</CodeInline>. A famous comic springs to mind:
    </P>
    <Image
      src={objectOrientedProgrammer}
      width={1250}
      height={811}
      alt={`"Object-oriented" programming.`}
    />
    <P>
      It’s not quite as bad. But the numerous URL classes give you the
      impression of forming URLs for you. But, think again — their constructors
      require you to provide the entire URLs yourself. No kidding. Additionally,{' '}
      <CodeInline>STORAGE_ACCOUNT_NAME</CodeInline> has to be supplied both to{' '}
      <CodeInline>SharedKeyCredential</CodeInline> and{' '}
      <CodeInline>ServiceURL</CodeInline>.
    </P>
    <P>
      Next up we’ve got <CodeInline>pipeline</CodeInline>, obtained from{' '}
      <CodeInline>StorageURL</CodeInline>. It’s an implementation detail.
      There’s no reason an SDK user should care about it unless it needs to be
      manually unclogged.
    </P>
    <P>
      Finally, look at the upload method. An <CodeInline>Aborter</CodeInline>{' '}
      object, of all things, is the first argument. Why is it so important?
      Preferably, I’d want a default that I can override if necessary. Lastly,
      content length being a required argument also feels inconvenient when, in
      most cases, it’s something the SDK can figure out.
    </P>
    <P>
      I’m being harsh. But keep in mind: this is a public SDK wrapping a REST
      API of a widely used service. It’s in its tenth major version. How is the
      SDK still this unpolished after being allowed so many incompatible API
      changes?
    </P>
    <H2>{headings[3]}</H2>
    <P>
      Let’s check out a good SDK for comparison’s sake. Chances are, it’s
      similar to your design. Here’s the minimal code, using Amazon Web
      Services’ SDK, to upload something:
    </P>
    <Code
      language="javascript"
      code={js2}
      caption={`Demonstrating a better API for uploading a "Blob" to a "Container".`}
    />
    <P>
      Beautiful. There’s no <CodeInline>pipeline</CodeInline>, pigeonPost, or
      smokeSignal going on here. You don’t stitch together URLs, and everything
      is sensibly named. Object-oriented programming done right.
    </P>
    <H2>{headings[4]}</H2>
    <P>
      Now, I’m not sure this counts as a data point — a certain profession
      claims it’s all the same — but someone criticized the Java version of the
      Blob Storage SDK. Other developers chime in, sharing the frustration. Here
      are some highlights from that{' '}
      <Link href="https://github.com/Azure/azure-storage-java/issues/432">
        GitHub issue
      </Link>
      , titled <Title>This API is useless (v10)</Title>:
    </P>
    <Quote>
      <P>
        The API is an unintuitive mess. Documentation is rubbish and out of sync
        with code, and the example is useless.
      </P>
      <P>
        I’ve been doing Java professional, every day, for 18 years, but never
        seen such a poor API.
      </P>
      <P>
        stop developing on the version 10 API and Kill it. KILL IT WITH FIRE!
      </P>
    </Quote>
    <P>
      We’re not known for beating around the bush, are we? This is quite an
      indictment.
    </P>
    <Quote>
      <P>
        The naming of BlobSASSignatureValues is really bad. It tells me
        absolutely nothing about what its purpose is. I would think it is simply
        a POJO class for holding some values. The name indicate it is a class of
        values, not a class of functionality.
      </P>
    </Quote>
    <P>Remember all those classes ending in URL?</P>
    <P>Another user posts:</P>
    <Quote>
      <P>
        We’ve also been using this (a team of advanced java developers) and have
        been struggling with getting it to work correctly.
      </P>
    </Quote>
    <P>
      Folks, it’s not a good sign when advanced developers have trouble using
      your REST API wrapper.
    </P>
    <P>A third developer adds:</P>
    <Quote>
      <P>
        I am giving serious consideration to just calling the REST endpoints
        directly instead of using the SDK
      </P>
    </Quote>
    <P>
      Finally, the original poster drops the mic explaining what he expects from
      an SDK:
    </P>
    <Quote>
      <P>
        First of all it should help me save time getting my job done. If using
        the SDK will cost me more time that going low level and e.g. call a rest
        interface myself, the SDK has failed.
      </P>
      <P>
        The SDK should hide the complexity about the service I’m using. I don’t
        care on bit if this SDK is communicating with the Azure service using
        REST, gRPC or rfc1149 as long as it is efficient. Using the SDK should
        make my codebase simpler than if I have not used it and it should
        improve maintainability.
      </P>
      <P>
        The SDK should be self explanatory and intuitive. If I need to read more
        than a few lines getting started, performing simple tasks, it has
        failed.
      </P>
    </Quote>
    <P>
      Preach brother, preach! Give this man a gold star! And he’s even thrown in
      a subtle pigeon reference as well!
    </P>
    <P>
      To be clear, I don’t think the JavaScript SDK is quite as bad — in fact,
      it’s acceptable. But for a run-of-the-mill SDK of a proprietary service,
      I’d expect better.
    </P>
    <H2>{headings[5]}</H2>
    <P>
      When creating an SDK, start with the user experience. Why are people using
      it and the service, and who are they? What would a good API be?
      Contemplate, look at similar SDKs for inspiration, and only then should
      you start coding yours.
    </P>
    <P>
      We sometimes miss the forest for the trees. The SDK’s source code utilizes
      many OOP concepts such as interfaces, inheritance, abstract classes,
      factories, and private methods. Yet, it failed with the very essence of
      OOP in terms of its API.
    </P>
    <H3>References</H3>
    <div className="text-sm">
      <P>Git repository (v10) and links to the Quickstart (v10 and v12):</P>
    </div>
    <UlReferences>
      <li>
        <Link href="https://github.com/Azure/azure-storage-js" external />
      </li>
      <li>
        <Link
          href="https://web.archive.org/web/20201112004321/https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs-legacy"
          external
        />
      </li>
      <li>
        <Link
          href="https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs"
          external
        />
      </li>
    </UlReferences>
  </>
);

const article: Article = {
  thumbnail: objectOrientedProgrammerSmall,
  title: 'How not to design an SDK',
  teaser:
    'The JavaScript SDK for Azure Blob Storage contains poor documentation and "object-oriented" programming.',
  published: 1646125841,
  readingTime: 5,
  headings,
  body,
};

export default article;
