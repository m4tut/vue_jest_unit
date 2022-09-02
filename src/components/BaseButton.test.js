import { render, screen } from '@testing-library/vue';

import BaseButton from './BaseButton.vue';

describe('BaseButton: ', () => {
  test('renders', () => {
    const text = 'Test component BaseButton';

    const options = {
      slots: {
        default: text,
      },
    };
    render(BaseButton, options);

    screen.getByText(text);
  });
});
