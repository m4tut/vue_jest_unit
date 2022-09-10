import { render } from '@testing-library/vue';

import BaseModalButtonClose from './BaseModalButtonClose.vue';

describe('BaseModalButtonClose: ', () => {
  test('renders', () => {
    const { html } = render(BaseModalButtonClose);

    expect(html()).toMatchSnapshot();
  });
});
