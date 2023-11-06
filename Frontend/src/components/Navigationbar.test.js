import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Navigationbar from './Navgationbar';
import {createRenderer} from 'react-test-renderer/shallow'

import { MemoryRouter } from "react-router-dom";

const renderer=createRenderer()

describe("Navigation bar page Screenshot test",()=>{
  test('renders correctly the navigation component',()=>{
  renderer.render(
    <MemoryRouter initialEntries={['/']}>
      <Navigationbar/>
    </MemoryRouter>
  );
  const result=renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
})
