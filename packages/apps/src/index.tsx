// Copyright 2017-2022 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

// setup these right at front
import './initSettings';
import 'semantic-ui-css/semantic.min.css';
import '@polkadot/react-components/i18n';
import '@polkadot/api-augment/substrate';

import * as Sentry from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
Sentry.init({
  dsn: 'https://dccc769357584ae3917698b5e6d7a503@o1245694.ingest.sentry.io/4505003648221184',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  // Performance Monitoring
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  tracesSampleRate: 1.0 // Capture 100% of the transactions, reduce in production!
});

const rootId = 'root';
const rootElement = document.getElementById(rootId);

if (!rootElement) {
  throw new Error(`Unable to find element with id '${rootId}'`);
}

ReactDOM.render(
  <Root isElectron={false} />,
  rootElement
);
