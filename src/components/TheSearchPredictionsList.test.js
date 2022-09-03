import { render, screen } from '@testing-library/vue';

import TheSearchPredictionsList from './TheSearchPredictionsList.vue';

describe('TheSearchPredictionsList: ', () => {
  let predictions = [];
  let checkedPredictions = [];

  beforeEach(() => {
    predictions = ['Prediction 1', 'Prediction 2', 'Prediction 3'];
    checkedPredictions = predictions.slice(1);
  });

  function renderPredictions(checkedPredictions) {
    const options = {
      props: {
        searchPredictions: predictions,
        modelValue: checkedPredictions,
      },
    };

    return render(TheSearchPredictionsList, options);
  }

  test('shows search predictions unchecked', () => {
    renderPredictions();

    predictions.forEach(prediction => {
      expect(screen.getByLabelText(prediction).checked).toBe(false);
    });
  });

  test('shows specified search predictions checked', () => {
    renderPredictions(checkedPredictions);

    expect(screen.getByLabelText(predictions[0]).checked).toBe(false);

    checkedPredictions.forEach(checkedPrediction => {
      expect(screen.getByLabelText(checkedPrediction).checked).toBe(true);
    });
  });
});
