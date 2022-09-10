import { render } from '@testing-library/vue';

import BaseModalOverlay from './BaseModalOverlay.vue';

describe('BaseModalOverlay: ', () => {
  test('renders', () => {
    const { html } = render(BaseModalOverlay);

    expect(html()).toMatchSnapshot();
  });
});
