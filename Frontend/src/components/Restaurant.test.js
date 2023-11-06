import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import RestaurantList from './Restaurants';

import {createRenderer} from 'react-test-renderer/shallow'

import { MemoryRouter } from "react-router-dom";

const renderer=createRenderer()

describe("Restaurant page Screenshot test",()=>{
  test('renders correctly the Restaurant component',()=>{
  renderer.render(
    <MemoryRouter initialEntries={['/']}>
      <RestaurantList/>
    </MemoryRouter>
  );
  const result=renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
})
