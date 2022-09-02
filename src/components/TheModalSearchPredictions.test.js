import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/vue';

import TheModalSearchPredictions from './TheModalSearchPredictions.vue';

describe('TheModalSearchPredictions: ', () => {
  let predictions = [];
  let categories = [];

  beforeEach(() => {
    predictions = ['Prediction 1', 'Prediction 2', 'Prediction 3'];
    categories = ['Category 1', 'Category 2', 'Category 3'];
  });

  function renderModal(searchPredictions, searchPredictionCategories) {
    const options = {
      props: {
        searchPredictions,
      },
      data: () => ({
        searchPredictionCategories,
      }),
    };

    return render(TheModalSearchPredictions, options);
  }

  test('shows search predictions', () => {
    renderModal(predictions);

    predictions.forEach(screen.getByText);
  });

  test('shows search prediction categories', () => {
    renderModal(null, categories);

    categories.forEach(screen.getByText);
  });

  test('does not show search prediction if closed', () => {
    renderModal(predictions);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    return waitForElementToBeRemoved(predictions.map(screen.queryByText));
  });

  test('does not show search prediction categories if closed', () => {
    renderModal(null, categories);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    return waitForElementToBeRemoved(categories.map(screen.queryByText));
  });
});
