import Image from '../../components/image/Image'
import {
  CodeInline,
  H2,
  H3,
  P,
  BlockQuote,
  UlReferences,
} from '../../components/article/Common'
import Link from '../../components/Link'
import Code from '../../components/article/Code'
import { Article } from '../../components/article/articleTypes'

import feelsBadMan from './feels-bad-man.png'
import npmInstallStart from './npm-install-start.png'
import excessiveInformation from './excessive-information.png'
import excessiveInformationLarge from './excessive-information-large.png'
import objectOrientedProgrammer from './object-oriented-programmer.png'
import objectOrientedProgrammerSmall from './object-oriented-programmer-small.png'
import ImageFloat from '../../components/image/ImageFloat'

const headings = [
  'Azure Blob Storage',
  'About JavaScript or the actual SDK?',
  '"Object-oriented" programming',
  'A good SDK',
  'Opinions about the Java SDK',
  'Takeaways',
]

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

// either
const serviceURL = new ServiceURL(
  \`https://\${STORAGE_ACCOUNT_NAME}.blob.core.windows.net\`,
  pipeline,
);
const containerURL = ContainerURL.fromServiceURL(serviceURL, container);
const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

// or
const blockBlobURL = new BlockBlobURL(
  \`https://\${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/\${container}\`,
  pipeline,
);

const aborter = Aborter.timeout(300000);

blockBlobURL.upload(aborter, body, body.length).then((response) => {
  console.log(response);
});
`

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
`

const body = () => (
  <>
    <P>
      There’s enthusiasm in the air as we start exploring a new library. It’s
      maintained and has a fair number of users. But frustration is about to set
      in.
    </P>
    <ImageFloat data={feelsBadMan} width={300} alt="FeelsBadMan" right />
    <P>
      The documentation takes forever to get to the relevant parts. The code
      examples? Talk about a worse signal-to-noise ratio. And once you
      scrutinize, things aren’t looking too great.
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
      websites, storing media, and backups — data in general. Objects you upload
      are called Blobs, and a Blob belongs to a Container.
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
      data={npmInstallStart}
      width={370}
      alt="Advanced concepts."
      right
    />
    <P>
      It starts by explaining how you clone repos and manage environment
      variables. Then, the advanced concepts of{' '}
      <CodeInline>npm install</CodeInline> and{' '}
      <CodeInline>npm start</CodeInline> each have their own Heading 2. Further
      down are explanations of fs and path, how variable assignment works, and
      why a top-level async function is needed. An additional page or two later,
      we finally see snippets demonstrating how to create a Container and upload
      a Blob.
    </P>
    <P>
      It’s better than nothing. But it wouldn’t be outlandish to assume that
      people seeking an SDK for a specific language understands its basics. It
      also feels excessive to provide a line-by-line commentary of example code,
      which should be simplistic in the first place.
    </P>
    <Image
      data={excessiveInformation}
      width={380}
      alt="v12’s Quickstart contains even more excessive information."
      zoomData={excessiveInformationLarge}
    />
    <H2>{headings[2]}</H2>
    <P>
      Imagine you’re designing an SDK for Blob Storage: users want to be able to
      create Containers and upload Blobs to them. What’s your ideal experience
      for this?
    </P>
    <P>
      Here’s the minimal code for uploading a Blob to a Container using v10 of
      the JavaScript SDK.
    </P>
    <Code
      language="javascript"
      code={js1}
      caption="Minimal code for uploading a Blob to a Container."
    />
    <P>Where do we even begin?</P>
    <P>
      The SDK’s underlying code is all-out object-oriented. There’s nothing
      inherently wrong with that. But read out loud the classes it provides us:{' '}
      <CodeInline>SharedKeyCredential</CodeInline>,{' '}
      <CodeInline>StorageURL</CodeInline>, <CodeInline>ServiceURL</CodeInline>,{' '}
      <CodeInline>ContainerURL</CodeInline>, and{' '}
      <CodeInline>BlockBlobURL</CodeInline>. A famous comic springs to mind:
    </P>
    <Image
      data={objectOrientedProgrammer}
      width={1250}
      alt={`“Object-oriented“ programming.`}
    />
    <P>
      The numerous URL classes also give you the impression of forming URLs for
      you. But no — their constructors expect you to provide the entire URLs
      (see <CodeInline>.blob.core.windows.net</CodeInline>). Additionally,{' '}
      <CodeInline>STORAGE_ACCOUNT_NAME</CodeInline> has to be passed both to{' '}
      <CodeInline>SharedKeyCredential</CodeInline> and{' '}
      <CodeInline>ServiceURL</CodeInline>.
    </P>
    <P>
      Next in line, we’ve got <CodeInline>pipeline</CodeInline>, obtained from
      StorageURL. It’s an implementation detail. There’s no reason an SDK user
      should care about it unless it needs manual unclogging.
    </P>
    <P>
      Finally, look at the upload method. Of all things, an{' '}
      <CodeInline>Aborter</CodeInline> object is the first argument. Why’s it so
      important? Preferably, I’d want a default that I can override if
      necessary. And content length being a required argument feels inconvenient
      when it’s something the SDK can figure out.
    </P>
    <P>
      I’m being harsh. For all I know, the SDK might’ve been thrown together by
      people new to software development with no one to guide them. But keep in
      mind: this is the official JavaScript SDK of Blob Storage. It’s on its
      tenth major version, and all for the sake of wrapping a REST API.
    </P>
    <H2>{headings[3]}</H2>
    <P>
      How does a good experience look like? Here’s the minimal code to upload
      something to S3 using AWS’s SDK:
    </P>
    <Code
      language="javascript"
      code={js2}
      caption="A better API for uploading."
    />
    <P>
      Beautiful. There’s no pipeline, pigeonPost, or smokeSignal going on here.
      You don’t form URLs. Everything looks sensible.
    </P>
    <H2>{headings[4]}</H2>
    <P>
      Is the JavaScript SDK just an aberration? Out of curiosity, I checked out
      the other SDKs.{' '}
      <Link href="https://github.com/Azure/azure-storage-java/issues/432">
        This API is useless (v10)
      </Link>
      , lo and behold, is the top-upvoted GitHub issue in the Java SDK. It
      starts off with a bang, with spicy statements:
    </P>
    <BlockQuote>
      <>
        The API is an unintuitive mess. Documentation is rubbish and out of sync
        with code, and the example is useless.
      </>
      <>
        I’ve been doing Java professional, every day, for 18 years, but never
        seen such a poor API.
      </>
      <>stop developing on the version 10 API and Kill it. KILL IT WITH FIRE!</>
    </BlockQuote>
    <P>
      Based! The original poster is particularly riled up because v10 feels like
      a leap backwards compared to the now deprecated v8. Further, he
      elaborates:
    </P>
    <BlockQuote>
      The naming of BlobSASSignatureValues is really bad. It tells me absolutely
      nothing about what its purpose is. I would think it is simply a POJO class
      for holding some values. The name indicate it is a class of values, not a
      class of functionality.
    </BlockQuote>
    <P>
      This is reminiscent of the classes from the JavaScript SDK ending in URLs.
      Later in the conversation, two other developers chime in:
    </P>
    <BlockQuote>
      <>
        We’ve also been using this (a team of advanced java developers) and have
        been struggling with getting it to work correctly.
      </>
      <>
        I am giving serious consideration to just calling the REST endpoints
        directly instead of using the SDK
      </>
    </BlockQuote>
    <P>
      Folks, we’ve found two litmus tests of whether an SDK is useless. What
      follows is the original poster explaining what they expect from an SDK,
      dropping the mic:
    </P>
    <BlockQuote>
      <>
        <P>
          First of all it should help me save time getting my job done. If using
          the SDK will cost me more time that going low level and e.g. call a
          rest interface myself, the SDK has failed.
        </P>
        <P>
          The SDK should hide the complexity about the service I’m using. I
          don’t care on bit if this SDK is communicating with the Azure service
          using REST, gRPC or rfc1149 as long as it is efficient. Using the SDK
          should make my codebase simpler than if I have not used it and it
          should improve maintainability.
        </P>
        <P>
          The SDK should be self explanatory and intuitive. If I need to read
          more than a few lines getting started, performing simple tasks, it has
          failed.
        </P>
        <P>
          It need to be stable and predictable so my time invested using the SDK
          is not wasted. Throwing an existing solution away to start from
          scratch should be avoided if possible. It need to evolve in a way so
          not to many breaking changes are introduced, preferable using semantic
          versioning.
        </P>
      </>
    </BlockQuote>
    <P>
      Preach brother, preach! Give this man a gold star! And he’s even thrown in
      a subtle pigeon reference as well.
    </P>
    <H2>{headings[5]}</H2>
    <P>
      An SDK is a product. As with any product, what’s the value-add? Why would
      people use it, and who are they? Steve Jobs once said, “you’ve got to
      start with the customer experience and work backward for the technology.”
      Otherwise, you’re giving the impression that the sole purpose of your SDK
      is so you can add a check to your sales deck.
    </P>
    <P>
      Also, we sometimes miss the forest for the trees. If you look into the
      source code of the JavaScript SDK v10, it’s obvious there’s a lot of
      object-oriented programming going on. Yet, it failed with one of the core
      concepts of OOP — that of providing actual abstractions.
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
)

const article: Article = {
  thumbnail: objectOrientedProgrammerSmall,
  title: 'How not to design an SDK',
  teaser:
    'The JavaScript SDK v10 for Azure Blob Storage is a mess and an example of “object-oriented“ programming.',
  published: 1646125841,
  readingTime: 5,
  headings,
  body,
}

export default article
