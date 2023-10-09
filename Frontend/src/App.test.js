import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for testing
import App from './App';

test('renders Login component when the root route is visited', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  await screen.findByText('Login');

  // Now, check if the Signup component is rendered
  const loginElement = screen.querySelector('Login');

  expect(loginElement).toBeInTheDocument();
});

test('renders Signup component when the /Signup route is visited', async () => {
  render(
    <MemoryRouter initialEntries={['/Signup']}>
      <App />
    </MemoryRouter>
  );

  // Use findByText to wait for the element to appear
  await screen.findByText('Signup');

  // Now, check if the Signup component is rendered
  const signupElement = screen.querySelector('Signup');

  expect(signupElement).toBeInTheDocument();
});