import { render, screen } from '@testing-library/vue';

import DropdownAppsListItem from './DropdownAppsListItem.vue';

describe('DropdownAppsListItem: ', () => {
  let label;

  beforeEach(() => {
    label = 'Label';
  });

  function renderListItem() {
    const options = {
      props: {
        label,
      },
    };

    return render(DropdownAppsListItem, options);
  }

  test('renders with label', () => {
    renderListItem();

    screen.getByText(label);
  });

  // test('renders correctly', () => {
  //   const { html } = renderListItem();

  //   expect(html()).toMatchSnapshot();
  // });
});
