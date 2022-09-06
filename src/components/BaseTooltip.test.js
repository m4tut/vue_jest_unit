import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import BaseTooltip from './BaseTooltip.vue';

describe('BaseTooltip: ', () => {
  let user, text, buttonLabel, button;
  beforeEach(() => {
    text = 'Tooltip text';
    buttonLabel = 'Click Me';
    button = `<button>${buttonLabel}</button>`;
    user = userEvent.setup();
  });

  function renderTooltip(text, element = '') {
    const options = {
      props: {
        text,
      },
      slots: {
        default: element,
      },
    };

    return render(BaseTooltip, options);
  }

  function getOwningElement() {
    return screen.getByText(buttonLabel).parentElement;
  }

  function hoverOverOwningElement() {
    return user.hover(getOwningElement());
  }

  function moveCursorAwayFromOwningElement() {
    return user.unhover(getOwningElement());
  }

  function clickOwningElement() {
    return user.click(getOwningElement());
  }

  describe('rendering', () => {
    test('renders hidden with specified text', () => {
      renderTooltip(text);

      expect(screen.getByText(text)).not.toBeVisible();
    });

    test('renders with owning element', () => {
      renderTooltip('', button);

      expect(screen.getByText(buttonLabel)).toBeVisible();
    });
  });

  describe('showing', () => {
    test('shows after hovering over owning element', async () => {
      renderTooltip(text, button);

      await hoverOverOwningElement();
      expect(screen.getByText(text)).toBeVisible();
    });
  });

  describe('hiding', () => {
    beforeEach(async () => {
      renderTooltip(text, button);

      await hoverOverOwningElement();
      expect(screen.getByText(text)).toBeVisible();
    });

    test('hides after moving cursor away from owning element', async () => {
      await moveCursorAwayFromOwningElement();
      expect(screen.getByText(text)).not.toBeVisible();
    });

    test('hides after clicking owning element', async () => {
      await clickOwningElement();
      expect(screen.getByText(text)).not.toBeVisible();
    });
  });
});
