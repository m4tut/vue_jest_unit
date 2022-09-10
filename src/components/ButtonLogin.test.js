import { render } from '@testing-library/vue';

import ButtonLogin from './ButtonLogin.vue';

describe('ButtonLogin: ', () => {
  test('renders', () => {
    const { html } = render(ButtonLogin);

    expect(html()).toMatchSnapshot();
  });
});
