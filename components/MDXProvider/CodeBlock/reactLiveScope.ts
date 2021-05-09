import {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  useSpring,
  useSprings,
  useTransition,
  useChain,
  useTrail,
  useSpringRef,
  animated,
  config,
} from '@react-spring/web';

const springScope = {
  useSpring,
  useSprings,
  useTransition,
  useChain,
  useTrail,
  useSpringRef,
  animated,
  config,
};

const reactScope = {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
};

const scope = {
  ...springScope,
  ...reactScope,
};

export default scope;
