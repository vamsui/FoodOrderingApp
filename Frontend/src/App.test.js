import React from 'react';
import { render,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders RestaurantList component on the default route', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

  // Check if RestaurantList component is rendered on the default route
  expect(getByText('Restaurants in Mumbai Open now')).toBeInTheDocument(); // Adjust text as needed
});

test('renders Model component on the /Model route', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/Model']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

  // Check if Model component is rendered on the /Model route
  const modelComponent = screen.getByTestId('model-component')
    
  expect(modelComponent).toBeInTheDocument();

});


test('renders Menu component on the Menu route', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/restmenu']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

  const menuComponent = screen.getByTestId('menu-component')
    
  expect(menuComponent).toBeInTheDocument();
});



test('renders Login component on the /Login route', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/Login']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

  // Check if Login component is rendered on the /Login route
  expect(getByText('Login')).toBeInTheDocument(); // Adjust text as needed
});



test('renders Address component on the /Address route', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/Address']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

  expect(getByText('Enter your address')).toBeInTheDocument(); // Adjust text as needed

});

test('renders Checkout component on the /Checkout route', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/Checkout']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

  expect(getByText('Enter your card details')).toBeInTheDocument(); // Adjust text as needed

});


// Add more tests for other routes as needed
