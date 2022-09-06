import { render, screen, waitForElementToBeRemoved } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import TheModalSearchPredictions from './TheModalSearchPredictions.vue';

describe('TheModalSearchPredictions: ', () => {
  let predictions = [];
  let categories = [];
  let user;

  beforeEach(() => {
    predictions = ['Prediction 1', 'Prediction 2', 'Prediction 3'];
    categories = ['Category 1', 'Category 2', 'Category 3'];
    user = userEvent.setup();
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

    user.click(screen.getByRole('button', { name: 'Cancel' }));

    return waitForElementToBeRemoved(predictions.map(screen.queryByText));
  });

  test('does not show search prediction categories if closed', () => {
    renderModal(null, categories);

    user.click(screen.getByRole('button', { name: 'Cancel' }));

    return waitForElementToBeRemoved(categories.map(screen.queryByText));
  });
});
