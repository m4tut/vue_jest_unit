import { render, screen } from '@testing-library/vue';

import CategoryItem from './CategoryItem.vue';

describe('CategoryItem: ', () => {
  let category;

  beforeEach(() => {
    category = 'Category';
  });

  function renderCategoryItem(isActive = false) {
    const options = {
      props: {
        category,
        isActive,
      },
    };

    return render(CategoryItem, options);
  }

  test('renders with label', () => {
    renderCategoryItem();

    screen.getByText(category);
  });

  test('renders correctly', () => {
    const { html } = renderCategoryItem(true);

    expect(html()).toMatchInlineSnapshot(`"<a href=\\"#\\" class=\\"px-3 py-1 transition rounded-full border border-gray-700 bg-gray-600 hover:bg-gray-500 text-white\\">Category</a>"`);
  });
});
