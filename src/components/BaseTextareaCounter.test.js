import { render } from '@testing-library/vue';

import BaseTextareaCounter from './BaseTextareaCounter.vue';

describe('BaseTextareaCounter: ', () => {
  test('renders', () => {
    const options = {
      slots: {
        default: '0 / 100',
      },
    };
    const { html } = render(BaseTextareaCounter, options);

    expect(html()).toMatchSnapshot();
  });
});
