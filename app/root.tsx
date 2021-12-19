import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix';
import type { LinksFunction } from 'remix';
import React from 'react';
import globalStylesUrl from '~/styles/global.css';

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: globalStylesUrl }];
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
        </div>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 404:
      message = <p>404: A truly fugitive sheet...</p>;
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <header className="site__header site-header">
        <h1 className="site-header__title">
          <Link to="/">
            Fugitive
            <br />
            <span aria-hidden>—</span> Sheets
          </Link>
        </h1>
        <div className="site-header__intro prose">
          <p>
            Anatomical{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Anatomical_fugitive_sheet"
            >
              “fugitive sheets”
            </a>{' '}
            are are illustrations of the body designed to display internal
            organs and structures using paper flaps. Their name arose from the
            frequency with which the accompanying sheets were torn or misplaced.
            This site reimagines the fugitive sheet as a misplaced code-snippet,
            framed within a randomly generated cut-out.
          </p>
          <p>
            <Link to="/about">Learn more</Link>
          </p>
        </div>
      </header>
      <div className="site__content">{children}</div>
      <footer className="site__footer site-footer">
        <span>
          Made for{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://dusty.domains/"
          >
            Dusty Domains
          </a>
        </span>
        <span>Created by Jay Freestone</span>
        <a
          href="https://twitter.com/jayfreestone"
          target="_blank"
          rel="noopener noreferrer"
        >
          @jayfreestone
        </a>
        <a
          href="https://www.jayfreestone.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          jayfreestone.com
        </a>
      </footer>
    </div>
  );
}
