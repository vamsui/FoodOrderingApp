import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup'; // Import your Signup component
import userEvent from '@testing-library/user-event';

describe('Signup Component', () => {
  beforeEach(() => {
    render(<Signup />);
  });

  it('renders the Signup form', () => {
    // Assert that the form elements are present
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText('Mobile')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});