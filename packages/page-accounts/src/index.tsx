// Copyright 2017-2023 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@polkadot/react-components/types';

import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';

import { HelpOverlay, Tabs } from '@polkadot/react-components';
import { useAccounts, useIpfs } from '@polkadot/react-hooks';

import basicMd from './md/basic.md';
import Accounts from './Accounts';
import GenerateWallet from './Generate';
import { useTranslation } from './translate';
import useCounter from './useCounter';

export { useCounter };

const HIDDEN_ACC = ['vanity'];

function AccountsApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { hasAccounts } = useAccounts();
  const { isIpfs } = useIpfs();

  const tabsRef = useRef([
    {
      isRoot: true,
      name: 'accounts',
      text: t<string>('My accounts')
    },
    {
      name: 'generate',
      text: t<string>('Generate Account')
    }
  ]);

  return (
    <main className='accounts--App'>
      <HelpOverlay md={basicMd as string} />
      <Tabs
        basePath={basePath}
        hidden={(hasAccounts && !isIpfs) ? undefined : HIDDEN_ACC}
        items={tabsRef.current}
      />
      <Switch>
        <Route path={`${basePath}/generate`}>
          <GenerateWallet />
        </Route>
        <Route>
          <Accounts
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(AccountsApp);
