import { render, screen } from '@testing-library/vue';
import BaseIcon from './BaseIcon.vue';

import icons from '../icons';

describe('BaseIcon: ', () => {
  let icon;

  function renderIcon(name, classes = null) {
    const options = {
      props: {
        name,
        class: classes,
      },
    };

    render(BaseIcon, options);
  }

  beforeEach(() => {
    icon = Object.keys(icons)[0];
  });

  afterEach(() => {
    screen.debug();
  });

  test('renders base icon', () => {
    renderIcon(icon);
    expect(screen.getByTestId('base-icon').innerHTML).toBeTruthy();
  });

  test('renders non-existent icon', () => {
    renderIcon('nonExistentIcon');
    expect(screen.getByTestId('base-icon').innerHTML).toBeFalsy();
  });

  test('renders icons with default class', () => {
    renderIcon(icon);
    const classes = screen.getByTestId('base-icon').getAttribute('class');
    expect(classes).toBe('w-6 h-6');
  });

  test('renders icons with custom class', () => {
    const customClasses = 'custom class test';
    renderIcon(icon, customClasses);
    expect(screen.getByTestId('base-icon').getAttribute('class')).toBe(customClasses);
  });
});
