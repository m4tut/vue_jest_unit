import { render, screen } from '@testing-library/vue';

import DropdownSettingsListItem from './DropdownSettingsListItem.vue';

import icons from '../icons';

describe('DropdownSettingsListItem: ', () => {
  let label, icon, subMenuIcon;

  beforeEach(() => {
    label = 'Label';
    icon = 'sun';
    subMenuIcon = 'chevronRight';
  });

  function renderDropdownSettingsListItem(label = '', icon = null, withSubMenu = false, active = false) {
    const options = {
      props: {
        active,
        label,
        icon,
        withSubMenu,
      },
    };

    return render(DropdownSettingsListItem, options);
  }

  test('renders with label', () => {
    renderDropdownSettingsListItem(label);

    screen.getByText(label);
  });

  test('renders with submenu icon', () => {
    renderDropdownSettingsListItem('', null, true);

    expect(screen.getByTestId('base-icon')).toContainHTML(icons[subMenuIcon]);
  });

  test('renders with specified icon', () => {
    renderDropdownSettingsListItem('', icon);

    expect(screen.getByTestId('base-icon')).toContainHTML(icons[icon]);
  });

  test('renders with specified icon and submenu icon', () => {
    renderDropdownSettingsListItem('', icon, true);

    const elements = screen.getAllByTestId('base-icon');

    expect(elements).toHaveLength(2);
    expect(elements[0]).toContainHTML(icons[icon]);
    expect(elements[1]).toContainHTML(icons[subMenuIcon]);
  });

  test('renders active with check icon', () => {
    renderDropdownSettingsListItem('', null, false, true);

    expect(screen.getByTestId('base-icon')).toContainHTML(icons['check']);
  });

  test('renders active with check icon even if another icon was specified', () => {
    renderDropdownSettingsListItem('', icon, false, true);

    expect(screen.getByTestId('base-icon')).toContainHTML(icons['check']);
  });
});
