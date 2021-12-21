import {
  Link,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useMatches,
} from 'remix';
import type { LinksFunction } from 'remix';
import React from 'react';
import globalStylesUrl from '~/styles/global.css';
import { useMatch } from 'react-router';

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStylesUrl },
    { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', href: '/img/icon.svg', sizes: 'image/svg+xml' },
    { rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png' },
  ];
};

export default function App() {
  const data = useLoaderData<RootData>();

  return (
    <Document analyticsId={data.env.GOOGLE_ANALYTICS_ID}>
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
      message = <p>A truly fugitive sheet...</p>;
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <div className="prose">
          <h1>
            {caught.status}: {caught.statusText}
          </h1>
          {message}
        </div>
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
  analyticsId,
}: {
  children: React.ReactNode;
  title?: string;
  analyticsId?: string;
}) {
  const matches = useMatches();
  // If at least one route wants to hydrate, this will return true
  const includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1, viewport-fit=cover"
        />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        {Boolean(analyticsId) && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${analyticsId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {includeScripts && <Scripts />}
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export interface RootData {
  baseUrl: string;
  currentUrl: string;
  env: {
    GOOGLE_ANALYTICS_ID?: string;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const data: RootData = {
    baseUrl: url.origin,
    currentUrl: url.toString(),
    env: {
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    },
  };

  return data;
};

export const meta: MetaFunction = ({ data }) => {
  const { baseUrl, currentUrl } = data as RootData;
  const socialImagePath = new URL('/img/social.jpg', baseUrl).toString();

  const title = 'Fugitive Sheets';
  const description =
    'Anatomical “fugitive sheets” are illustrations of' +
    ' the body designed to display internal organs and structures using paper flaps. Their name arose from the frequency with which the accompanying sheets were torn or misplaced. This site reimagines the fugitive sheet as a misplaced code-snippet, framed within a randomly generated cut-out.';

  return {
    title,
    description,
    'og:title': title,
    'og:url': currentUrl,
    'og:description': description,
    'og:locale': 'en_US',
    'og:image': socialImagePath,
    'twitter:card': 'summary_large_image',
    'twitter:image': socialImagePath,
    'twitter:creator': '@jayfreestone',
    'twitter:site': '@jayfreestone',
  };
};

function Layout({ children }: { children: React.ReactNode }) {
  const match = useMatch('/');
  const TitleTag = match ? 'h1' : 'span';

  return (
    <div className="site">
      <header className="site__header site-header">
        <TitleTag className="site-header__title">
          <Link to="/">
            Fugitive
            <br />
            <span aria-hidden>—</span> Sheets
          </Link>
        </TitleTag>
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
            are illustrations of the body designed to display internal organs
            and structures using paper flaps. Their name arose from the
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
