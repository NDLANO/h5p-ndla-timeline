import { H5P } from 'h5p-utils';
import { H5PWrapper } from './H5P/H5PWrapper';
import './styles.scss';

// TODO: Why was this not properly typed before?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(H5P as any).NDLATimeline = H5PWrapper;
