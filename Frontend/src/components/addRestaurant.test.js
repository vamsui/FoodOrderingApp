import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Addrestaurant from './addRestaurant';

import {createRenderer} from 'react-test-renderer/shallow'

import { MemoryRouter } from "react-router-dom";



const renderer=createRenderer()

describe("Add Restaurant page Screenshot test",()=>{
  test('renders correctly the Add restaurant component',()=>{
  renderer.render(
    <MemoryRouter initialEntries={['/']}>
      <Addrestaurant/>
    </MemoryRouter>
  );
  const result=renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
})
