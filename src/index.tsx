import { H5P } from "./H5P/H5P.util";
import { H5PWrapper } from "./H5P/H5PWrapper";
import "./styles.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(H5P as any).NDLATimeline = H5PWrapper;
