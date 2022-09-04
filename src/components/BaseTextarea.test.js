import { render, screen } from '@testing-library/vue';

import BaseTextarea from './BaseTextarea.vue';

describe('BaseTextarea: ', () => {
  let text;
  beforeEach(() => {
    text = 'Test text';
  });

  function renderTextarea(text, limit) {
    const options = {
      props: {
        modelValue: text,
        limit,
      },
    };

    return render(BaseTextarea, options);
  }

  test('renders prefilled', () => {
    renderTextarea(text);

    screen.getByDisplayValue(text);
  });

  test('shows counter', () => {
    const limit = 100;
    renderTextarea(text, limit);

    screen.getByText(`${text.length} / ${limit}`);
  });
});
