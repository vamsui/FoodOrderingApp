import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Reg from './Reg';

import {createRenderer} from 'react-test-renderer/shallow'

import { MemoryRouter } from "react-router-dom";



const renderer=createRenderer()

describe("Register page Screenshot test",()=>{
  test('renders correctly the register component',()=>{
  renderer.render(
    <MemoryRouter initialEntries={['/']}>
      <Reg/>
    </MemoryRouter>
  );
  const result=renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
})




/*
// Mock the API call for email existence
jest.mock('./Reg', () => ({
  checkEmailExistence: jest.fn(),
}));

describe('Registration Page', () => {
  
  it('renders the registration form', () => {
    // Check if form elements are present
    expect(screen.getByLabelText('firstName')).toBeInTheDocument();
    expect(screen.getByLabelText('last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('gmail')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
    expect(screen.getByLabelText('confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Mobile')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('validates form input and displays errors', async () => {
    const submitButton = screen.getByText('Sign in');

    // Submit the form without filling in any fields
    fireEvent.click(submitButton);

    // Check if validation error messages are displayed
    expect(await screen.findByText('First name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Last name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(await screen.findByText('Please enter a valid password.')).toBeInTheDocument();
    expect(await screen.findByText('Password do not match.')).toBeInTheDocument();
    expect(await screen.findByText('Please enter a valid mobile number.')).toBeInTheDocument();
  });

  it('submits the form on valid input', async () => {
    const submitButton = screen.getByText('Sign in');

    // Fill in valid form data
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Gmail'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Mobile'), { target: { value: '1234567890' } });

    // Submit the form
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // You can add assertions to check if the form is successfully submitted here
  });

  it('checks email existence', async () => {
    const emailInput = screen.getByLabelText('Gmail');
    const emailMock = 'john.doe@example.com';

    // Simulate entering an email
    fireEvent.change(emailInput, { target: { value: emailMock } });

    // Mock the API call for email existence
    checkEmailExistence.mockResolvedValue(true);

    // Trigger email existence check
    fireEvent.click(screen.getByText('Sign in'));

    // Check if the component triggers the email existence check
    expect(await screen.findByText('Email user already registered')).toBeInTheDocument();
  });
});
*/