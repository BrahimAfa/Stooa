/*!
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const modifiedValues = {
  title: '',
  hours: '',
  description: '',
  startDateTimeTz: new Date(),
  duration: '',
  durationFormatted: '',
  timezone: '',
  locale: '',
  language: '',
  hasIntroduction: false
};

When('clicks on fishbowl card', () => {
  cy.wait('@getOneFishbowlsListQuery');

  cy.get(`[data-testid=Fishbowl-title]`).click({ force: true });

  cy.screenshot();
});

When('clicks on fishbowl card that is about to start', () => {
  cy.wait('@getOneCloseFishbowlsListQuery');

  cy.get(`[data-testid=Fishbowl-title]`).click({ force: true });
});

Then('sees the fishbowl edit form full of information', () => {
  cy.wait(1000);
  cy.get('[data-testid=edit-form-title]').should('have.value', 'Fishbowl title');
  cy.get('[data-testid=edit-form-description]').should('have.value', 'Fishbowl description');
  cy.get('input[name="day"]').should('have.value', '11/02/2030');

  cy.screenshot();
});

When('modifies the fishbowl {string} writing {string}', (fieldName = '', newValue = '') => {
  cy.get(`:is(input, textarea, div)[name=${fieldName}]`).clear().type(newValue);
  modifiedValues[fieldName] = newValue;
});

When('modifies the fishbowl {string} selecting {string}', (fieldName = '', newValue = '') => {
  cy.get(`select[name=${fieldName}]`).select(newValue);
  modifiedValues[fieldName] = newValue;
  console.log(modifiedValues);
});

When('modifies the fishbowl {string} to true', (fieldName = '') => {
  cy.get(`input[name=${fieldName}]`).click({ force: true });
  modifiedValues[fieldName] = true;
});

When('saves the changes', () => {
  cy.get('form').submit();
});

Then('sees success message', () => {
  cy.get('[data-testid=edit-form-title]').should('have.value', 'Fishbowl title');
  cy.screenshot();
});

Given('an updated fishbowl', () => {
  const mergedValues = {
    data: {
      updateFishbowl: {
        fishbowl: {
          id: '/fishbowls/a34b3ba8-df6b-48f2-b41c-0ef612b432a7',
          description: modifiedValues.description,
          startDateTimeTz: modifiedValues.startDateTimeTz,
          timezone: modifiedValues.timezone,
          duration: modifiedValues.hours,
          hasIntroduction: modifiedValues.hasIntroduction,
          locale: modifiedValues.language,
          slug: 'test-me-fishbowl',
          isFishbowlNow: false,
          durationFormatted: modifiedValues.hours,
          name: modifiedValues.title
        }
      }
    }
  };

  cy.intercept('POST', 'https://localhost:8443/graphql', mergedValues).as(
    'gqlUpdateFishbowlMutation'
  );
});

Then('sees the fishbowl list updated', () => {
  cy.wait('@gqlUpdateFishbowlMutation');

  const startDateTime = new Date(modifiedValues.startDateTimeTz);

  const month = startDateTime.toLocaleString('default', { month: 'long' });
  const day = startDateTime.toLocaleString('default', { day: 'numeric' });
  const time = startDateTime.toLocaleString('default', { hour: 'numeric', minute: 'numeric' });
  const year = startDateTime.toLocaleString('default', { year: 'numeric' });

  cy.get('[data-testid=fishbowl-list-wrapper] h4').eq(0).should('contain', modifiedValues.title);
  cy.get('[data-testid=fishbowl-list-wrapper] .card__date')
    .eq(0)
    .should('contain', `${month} ${day}, ${year}`);
  cy.get('[data-testid=fishbowl-list-wrapper] .card__time').eq(0).should('contain', time);

  cy.screenshot();
});

Then('sees the placeholder area', () => {
  cy.get('[data-testid=selected-placeholder]').should('exist');

  cy.screenshot();
});

Then('sees a placeholder with Enter Fishbowl button', () => {
  cy.get('[data-testid=started-fishbowl-placeholder] button').should('exist');
});

Then('clicks on placeholders Enter Fishbowl link', () => {
  cy.wait(2000);
  cy.get('[data-testid=started-fishbowl-placeholder] a').click({ force: true });
});

Then('sees success messages', () => {
  cy.get('span.success-message-top').should('exist');
  cy.get('span.success-message-bottom').should('exist');

  cy.wait(5500);
  cy.get('span.success-message-top').should('not.exist');
  cy.get('span.success-message-bottom').should('not.exist');
});
