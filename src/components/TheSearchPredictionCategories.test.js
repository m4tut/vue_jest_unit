import { render, screen } from '@testing-library/vue';

import TheSearchPredictionCategories from './TheSearchPredictionCategories.vue';

describe('TheSearchPredictionCategories: ', () => {
  let categories = [];
  let checkedCategory = '';

  beforeEach(() => {
    categories = ['Category 1', 'Category 2', 'Category 3'];
    checkedCategory = 'Category 1';
  });

  function renderCategories(checkedCategory) {
    const options = {
      props: {
        categories,
        modelValue: checkedCategory,
      },
    };

    return render(TheSearchPredictionCategories, options);
  }

  test('shows search categories unchecked', () => {
    renderCategories();

    categories.forEach(category => {
      expect(screen.getByLabelText(category).checked).toBe(false);
    });
  });

  test('shows specified search categories checked', () => {
    renderCategories(checkedCategory);

    expect(screen.getByLabelText(checkedCategory).checked).toBe(true);
    expect(screen.getByLabelText(categories[1]).checked).toBe(false);
    expect(screen.getByLabelText(categories[2]).checked).toBe(false);
  });
});
