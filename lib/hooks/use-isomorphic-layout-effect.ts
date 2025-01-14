"use client";

import { useEffect, useLayoutEffect } from 'react';

// Use useLayoutEffect in browser, fallback to useEffect in SSR
export const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;