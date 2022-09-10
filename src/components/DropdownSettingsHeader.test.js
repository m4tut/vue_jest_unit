import { render, screen } from '@testing-library/vue';

import DropdownSettingsHeader from './DropdownSettingsHeader.vue';

describe('DropdownSettingsHeader: ', () => {
  let title;

  beforeEach(() => {
    title = 'Title';
  });

  function renderDropdownSettingsHeader() {
    const options = {
      props: {
        title,
      },
    };

    return render(DropdownSettingsHeader, options);
  }

  test('renders with title', () => {
    renderDropdownSettingsHeader();

    screen.getByText(title);
    screen.getByRole('button');
  });
});
