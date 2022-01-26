import { ArrowDirection, ArrowType } from "../components/Arrow/Utils";

export type ArrowItemType = {
  id: string;

  /** The x position as a percentage of the arrow's width */
  xPercentagePosition: number;

  /** The y position as a percentage of the arrow's height */
  yPercentagePosition: number;

  /** The width as a percentage of the arrow's width */
  widthPercentage: number;

  /** The height as a percentage of the arrow's height */
  heightPercentage: number;

  /** The direction of the arrow's head */
  arrowDirection: ArrowDirection;

  /** The arrow type */
  arrowType: ArrowType;

  label: string;
  description?: string | undefined;
  links?: Array<string> | undefined;
};
