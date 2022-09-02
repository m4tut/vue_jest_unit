import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/vue';

import BaseModal from './BaseModal.vue';

import icons from '../icons';

describe('BaseModal: ', () => {
  // afterEach(() => {
  //   screen.debug();
  // });

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

  test('renders base modal with body and footer', () => {
    const body = 'This is modal body';
    const footer = 'This is modal footer';
    renderBaseModal(body, footer);

    screen.getByText(body);
    screen.getByText(footer);
  });

  test('renders base modal with close button', () => {
    renderBaseModal('', '', true);

    expect(screen.getByTestId('base-icon').innerHTML).toBe(icons['x']);
  });

  test('renders base modal without close button', () => {
    renderBaseModal('', '', false);

    expect(screen.queryByTestId('base-icon')).toBeNull();
  });

  test('close base modal when clicking close button', () => {
    const body = 'This is modal body';
    renderBaseModal(body, '', true);

    fireEvent.click(screen.getByTestId('base-modal-button-close'));

    return assertModalClosed(body);
  });

  test('close base modal when clicking overlay', () => {
    const body = 'This is modal body';
    renderBaseModal(body);

    fireEvent.click(screen.getByTestId('base-modal-overlay'));

    return assertModalClosed(body);
  });

  test('close base modal when clicking cancel button in the footer', () => {
    const body = 'This is modal body';
    const footer = `
      <template #footer="{ close }">
        <button @click="close">Cancel</button>
      </template>
    `;
    renderBaseModal(body, footer);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    return assertModalClosed(body);
  });

  test('close base modal when pressing esc key', () => {
    const body = 'This is modal body';
    renderBaseModal(body);

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Esc' });

    return assertModalClosed(body);
  });
});
