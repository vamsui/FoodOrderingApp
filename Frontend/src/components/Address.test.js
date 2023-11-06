import React from 'react';
import Payment from './Address';

import {createRenderer} from 'react-test-renderer/shallow'

import { MemoryRouter } from "react-router-dom";
const renderer=createRenderer()

describe("Address page Screenshot test",()=>{
  test('renders correctly the address component',()=>{
  renderer.render(
    <MemoryRouter initialEntries={['/']}>
      <Payment/>
    </MemoryRouter>
  );
  const result=renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
})
