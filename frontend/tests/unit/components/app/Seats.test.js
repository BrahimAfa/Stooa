/*!
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { render, screen } from '@testing-library/react';

import { StateProvider } from '@/contexts/AppContext';
import Seats from '@/components/App/Seats';
import { IConferenceStatus } from '@/jitsi/Status';

import I18nProvider from 'next-translate/I18nProvider';

import appEN from 'locales/en/app.json';

const introState = {
  fishbowlReady: true,
  fishbowlStarted: false,
  isGuest: false,
  prejoin: false,
  conferenceStatus: IConferenceStatus.NOT_STARTED
};

const renderWithContext = state => {
  render(
    <I18nProvider lang={'en'} namespaces={{ app: appEN }}>
      <StateProvider value={[state]}>
        <Seats />
      </StateProvider>
    </I18nProvider>
  );
};

describe('Unit test of fishbowl seats', () => {
  it('Unstarted fishbowl with all unavailable seats', () => {
    renderWithContext(introState);

    const seats = screen.getAllByText('Seat unavailable');
    expect(seats.length).toBe(5);
  });
});
