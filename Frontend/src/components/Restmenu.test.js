import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Menu from './Restmenu';

import {createRenderer} from 'react-test-renderer/shallow'

import { MemoryRouter } from "react-router-dom";

const renderer=createRenderer()

describe("Menu page Screenshot test",()=>{
  test('renders correctly the menu component',()=>{
  renderer.render(
    <MemoryRouter initialEntries={['/']}>
      <Menu/>
    </MemoryRouter>
  );
  const result=renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
})
