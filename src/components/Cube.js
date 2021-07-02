import React from 'react';
import { useBox } from 'use-cannon';

import * as texture from '../textures'

export const Cube = ({ position, type, ...props }) => {
  const [ref] = useBox(() => {
    return {
      type: 'Static',
      position,
      ...props
    }
  });

  return (
    <mesh castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
    </mesh>
  )
}
