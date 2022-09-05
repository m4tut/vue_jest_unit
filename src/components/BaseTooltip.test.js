import { fireEvent, render, screen } from '@testing-library/vue';

import BaseTooltip from './BaseTooltip.vue';

import icons from '../icons';

describe('BaseTooltip: ', () => {
  let text, buttonLabel, button;
  beforeEach(() => {
    text = 'Tooltip text';
    buttonLabel = 'Click Me';
    button = `<button>${buttonLabel}</button>`;
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

  test('renders hidden with specified text', () => {
    renderTooltip(text);

    expect(screen.getByText(text)).not.toBeVisible();
  });

  test('renders with owning element', () => {
    renderTooltip('', button);

    expect(screen.getByText(buttonLabel)).toBeVisible();
  });

  test('shows after hovering over owning element', async () => {
    renderTooltip(text, button);

    await fireEvent.mouseEnter(screen.getByText(buttonLabel).parentElement);
    expect(screen.getByText(text)).toBeVisible();
  });

  test('hides after moving cursor away from owning element', async () => {
    renderTooltip(text, button);

    await fireEvent.mouseEnter(screen.getByText(buttonLabel).parentElement);
    expect(screen.getByText(text)).toBeVisible();

    await fireEvent.mouseLeave(screen.getByText(buttonLabel).parentElement);
    expect(screen.getByText(text)).not.toBeVisible();
  });

  test('hides after after clicking owning element', async () => {
    renderTooltip(text, button);

    await fireEvent.mouseEnter(screen.getByText(buttonLabel).parentElement);
    expect(screen.getByText(text)).toBeVisible();

    await fireEvent.click(screen.getByText(buttonLabel));
    expect(screen.getByText(text)).not.toBeVisible();
  });
});
