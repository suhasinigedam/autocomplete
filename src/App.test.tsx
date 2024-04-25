import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AutoComplete component inside App', () => {
  render(<App />);
  const autoCompleteElement = screen.getByLabelText('auto-complete');
  expect(autoCompleteElement).toBeInTheDocument();
});
