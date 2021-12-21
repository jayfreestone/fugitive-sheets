import type { MetaFunction } from 'remix';
import React from 'react';

export const meta: MetaFunction = () => {
  return {
    title: 'About | Fugitive Sheets',
    description:
      "Each sheet includes an excerpt of code taken I've written throughout my career — some private, some public, some good and some poor. Where a source is public, it is provided.",
  };
};

export default function About() {
  return (
    <main className="about">
      <div className="about__prose prose">
        <h1>About</h1>
        <p>
          When I first heard the term{' '}
          <a href="https://en.wikipedia.org/wiki/Anatomical_fugitive_sheet">
            “fugitive sheets”
          </a>{' '}
          I instantly registered the domain. I loved the idea of deconstructing
          something and displaying it in a novel way.
        </p>

        <p>
          I also loved the idea of the lost sheets themselves, windows into the
          inner workings of something, devoid of context, as found objects in
          the world.
        </p>

        <p>
          For <a href="https://dusty.domains/">Dusty Domains</a>, I finally
          decided to devote a weekend to putting something together.
        </p>

        <p>
          Each sheet includes an excerpt of code taken taken from my career —
          some private (although not too private), some public, some good and
          some poor. Where a source is public, it is provided.
        </p>

        <p>
          Each accompanying shape is randomly generated, then split into two in
          order to use{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside">
            shape-outside
          </a>{' '}
          to wrap the code.
        </p>

        <p>There's no goal or structure, it's just a bit of fun.</p>
      </div>
    </main>
  );
}
