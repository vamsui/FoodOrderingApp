import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Checkout from './Checkout';

import {createRenderer} from 'react-test-renderer/shallow'

import { MemoryRouter } from "react-router-dom";
const renderer=createRenderer()

describe("Register page Screenshot test",()=>{
  test('renders correctly the register component',()=>{
  renderer.render(
    <MemoryRouter initialEntries={['/']}>
      <Checkout/>
    </MemoryRouter>
  );
  const result=renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
})
