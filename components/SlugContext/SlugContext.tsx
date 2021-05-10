import { createContext, useContext } from 'react';
import Slugger from 'github-slugger';

const SlugContext = createContext(new Slugger());

export const useSlug = (): Slugger => useContext(SlugContext);

export { SlugContext };
