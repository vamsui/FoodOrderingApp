import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MealsSummary from './MealsSummary';

import {createRenderer} from 'react-test-renderer/shallow'

import { MemoryRouter } from "react-router-dom";
const renderer=createRenderer()

describe("Meals Summary page Screenshot test",()=>{
  test('renders correctly the Meals Summary component',()=>{
  renderer.render(
    <MemoryRouter initialEntries={['/']}>
      <MealsSummary/>
    </MemoryRouter>
  );
  const result=renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
})
