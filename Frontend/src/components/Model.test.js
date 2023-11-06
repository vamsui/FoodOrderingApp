import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Model from './Model';

import {createRenderer} from 'react-test-renderer/shallow'

import { MemoryRouter } from "react-router-dom";

const renderer=createRenderer()

describe("Model page Screenshot test",()=>{
  test('renders correctly the model component',()=>{
  renderer.render(
    <MemoryRouter initialEntries={['/']}>
      <Model/>
    </MemoryRouter>
  );
  const result=renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
})
