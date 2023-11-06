import React from 'react';
import Login from './Login';
import {createRenderer} from 'react-test-renderer/shallow'

import { MemoryRouter } from "react-router-dom";



const renderer=createRenderer()

describe("Login page Screenshot test",()=>{
  test('renders correctly the login component',()=>{
  renderer.render(
    <MemoryRouter initialEntries={['/']}>
      <Login/>
    </MemoryRouter>
  );
  const result=renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
})
