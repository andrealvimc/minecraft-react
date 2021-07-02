import create from 'zustand';

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => {
  return {
    cubes: getLocalStorage("world") || [{ pos: [0, 0, 0], type: 'wood' }],
    addCube: (x, y, z, type) => {
      set((state => {
        return {
          cubes: [...state.cubes, { pos: [x, y, z], type }]
        }
      }));
    },
    removeCube: (x, y, z) => {
      set((state => {
        return state.cubes.filter(cube => cube.x !== x || cube.y !== y || cube.z !== z);
      }));
    },
    texture: 'wood',
    setTexture: (texture) => {
      set(state => {
        return {
          texture
        }
      })
    },
    saveWorld: () => {
      set((state => {
        setLocalStorage("world", state.cubes)
      }));
    }
  }
});