import { ReactNode } from 'react'

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 text-xl font-medium text-green-500 first:mt-0">
      {children}
    </h2>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4">{children}</p>
}

export default function About() {
  return (
    <div className="mx-auto max-w-2xl">
      <H2>What’s this?</H2>
      <P>
        <span className="italic">The Diamond Casino Heist</span> in GTA Online
        introduces two hacking minigames, one of them being the fingerprint
        scanner. To maximize your take, you have to be fast. Use this simulator
        to practice – outside the heist, without the loading screens, on your
        phone!
      </P>
      <P>
        There are 4 fingerprints in total. For each fingerprint, tap/click on
        the 4 elements (parts, segments) that make up the fingerprint.
      </P>
      <H2>Difference between Normal and Hard?</H2>
      <P>
        Hard leaves you to select the correct 4 elements without looking at each
        fingerprint. Once you’ve practiced enough, you’ll manage. This is how
        you hack the fastest in the actual heist!
      </P>
      <P>These two modes do not exist in the actual heist.</P>
      <H2>Need additional tools?</H2>
      <P>
        I’ve not been playing GTA Online since 2020. If you have questions or
        suggestions on other tools to make, reach out to me via{' '}
        <a
          href="mailto:hi@johan.li"
          className="font-medium text-cyan-400 hover:text-cyan-300"
        >
          hi@johan.li
        </a>
        .
      </P>
    </div>
  )
}
