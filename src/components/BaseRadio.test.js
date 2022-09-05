import { render, screen } from '@testing-library/vue';

import BaseRadio from './BaseRadio.vue';

describe('BaseRadio: ', () => {
  let value, label;

  beforeEach(() => {
    value = 'value';
    label = 'Label';
  });

  function renderRadio(label, value, isChecked = false) {
    const options = {
      slots: {
        default: label,
      },
      props: {
        id: 'id',
        modelValue: isChecked ? value : null,
        value,
      },
    };

    return render(BaseRadio, options);
  }

  test('renders checked with label', () => {
    renderRadio(label, value, true);

    expect(screen.getByLabelText(label)).toBeChecked();
  });

  test('renders unchecked with label', () => {
    renderRadio(label, value, false);

    expect(screen.getByLabelText(label)).not.toBeChecked();
  });

  test('renders with value', () => {
    renderRadio(label, value);

    expect(screen.getByLabelText(label).value).toBe(value);
  });
});
