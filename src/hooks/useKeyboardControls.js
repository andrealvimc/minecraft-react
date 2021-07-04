import { useState, useEffect } from 'react';
import { useStore } from '../hooks/useStore'

function actionByKey(key) {
  const keys = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
  };
  return keys[key];
}

function textureByKey(key) {
  const keys = {
    Digit1: 'dirt',
    Digit2: 'grass',
    Digit3: 'glass',
    Digit4: 'wood',
    Digit5: 'log'
  };
  return keys[key];
}

export const useKeyboardControls = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });
  const setTexture = useStore((state) => [state.setTexture]);

  useEffect(() => {
    const handleOnKeyDown = (e) => {
      // Moviment Key
      if (actionByKey(e.code)) {
        setMovement((state) => ({
          ...state,
          [actionByKey(e.code)]: true
        }));
      }
      // Texture key
      if (textureByKey(e.code)) {
        setTexture(textureByKey(e.code));
      }
    };

    const handleOnKeyUp = (e) => {
      // Moviment Key
      if (actionByKey(e.code)) {
        setMovement((state) => ({
          ...state,
          [actionByKey(e.code)]: false
        }));
      }
    }

    document.addEventListener('keydown', handleOnKeyDown);
    document.addEventListener('keyup', handleOnKeyUp);

    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
      document.removeEventListener('keyup', handleOnKeyUp);
    }
  }, [setTexture]);
  return movement;
}