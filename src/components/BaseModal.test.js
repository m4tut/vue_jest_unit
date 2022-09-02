import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/vue';

import BaseModal from './BaseModal.vue';

import icons from '../icons';

describe('BaseModal: ', () => {
  let body;

  beforeEach(() => {
    body = 'This is modal body';
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

    expect(screen.getByTestId('base-icon').innerHTML).toBe(icons['x']);
  });

  test('renders without close button', () => {
    renderBaseModal('', '', false);

    expect(screen.queryByTestId('base-icon')).toBeNull();
  });

  test('close when clicking close button', () => {
    renderBaseModal(body, '', true);

    fireEvent.click(screen.getByTestId('base-modal-button-close'));

    return assertModalClosed(body);
  });

  test('close when clicking overlay', () => {
    renderBaseModal(body);

    fireEvent.click(screen.getByTestId('base-modal-overlay'));

    return assertModalClosed(body);
  });

  test('close when clicking cancel button in the footer', () => {
    const footer = `
      <template #footer="{ close }">
        <button @click="close">Cancel</button>
      </template>
    `;
    renderBaseModal(body, footer);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    return assertModalClosed(body);
  });

  test('close when pressing esc key', () => {
    renderBaseModal(body);

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Esc' });

    return assertModalClosed(body);
  });
});
