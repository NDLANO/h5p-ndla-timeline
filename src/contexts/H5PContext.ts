import { createContext } from 'react';
import { H5PWrapper } from '../H5P/H5PWrapper';

export const H5PContext = createContext<H5PWrapper | undefined>(undefined);
