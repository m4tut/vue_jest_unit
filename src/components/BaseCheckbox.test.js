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

    expect(screen.getByLabelText(text)).toBeChecked();
  });

  test('renders unchecked', () => {
    render(BaseCheckbox);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
