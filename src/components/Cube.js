import React from 'react';
import { useBox } from 'use-cannon';

import * as textures from '../textures'

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
      {[Array(6)].map((_, index) => (
        <meshStandardMaterial
          attach="material"
          map={textures[type]}
          key={index}
        />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  )
}
