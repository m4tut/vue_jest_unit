import { render, screen } from '@testing-library/vue';

import BaseCheckbox from './BaseCheckbox.vue';

describe('BaseCheckbox: ', () => {
  test('renders checked with label', () => {
    const text = 'Test component BaseCheckbox';
    const value = 1;

    const options = {
      props: {
        id: 'checkbox',
        value: value,
        modelValue: [value, 2, 3],
      },
      slots: {
        default: text,
      },
    };

    render(BaseCheckbox, options);

    const checkbox = screen.getByLabelText(text);

    expect(checkbox.checked).toBe(true);
  });

  test('renders unchecked', () => {
    render(BaseCheckbox);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox.checked).toBe(false);
  });
});
