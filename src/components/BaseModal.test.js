import { render, screen, waitForElementToBeRemoved } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import BaseModal from './BaseModal.vue';

import icons from '../icons';

describe('BaseModal: ', () => {
  let body, user;

  beforeEach(() => {
    body = 'This is modal body';
    user = userEvent.setup();
  });

  function renderBaseModal(body = '', footer = '', withCloseButton = false) {
    const options = {
      props: {
        withCloseButton,
      },
      slots: {
        default: body,
        footer,
      },
    };

    return render(BaseModal, options);
  }

  function assertModalClosed(body) {
    return waitForElementToBeRemoved([screen.queryByText(body), screen.queryByTestId('base-modal-overlay')]);
  }

  test('renders with body and footer', () => {
    const footer = 'This is modal footer';
    renderBaseModal(body, footer);

    screen.getByText(body);
    screen.getByText(footer);
  });

  test('renders with close button', () => {
    renderBaseModal('', '', true);

    expect(screen.getByTestId('base-icon')).toContainHTML(icons['x']);
  });

  test('renders without close button', () => {
    renderBaseModal('', '', false);

    expect(screen.queryByTestId('base-icon')).not.toBeInTheDocument();
  });

  test('close when clicking close button', () => {
    renderBaseModal(body, '', true);

    user.click(screen.getByTestId('base-modal-button-close'));

    return assertModalClosed(body);
  });

  test('close when clicking overlay', () => {
    renderBaseModal(body);

    user.click(screen.getByTestId('base-modal-overlay'));

    return assertModalClosed(body);
  });

  test('close when clicking cancel button in the footer', () => {
    const footer = `
      <template #footer="{ close }">
        <button @click="close">Cancel</button>
      </template>
    `;
    renderBaseModal(body, footer);

    user.click(screen.getByRole('button', { name: 'Cancel' }));

    return assertModalClosed(body);
  });

  test('close when pressing esc key', () => {
    renderBaseModal(body);

    screen.getByRole('dialog').focus();
    user.keyboard('{Escape}');

    return assertModalClosed(body);
  });
});
