import { ElementType } from "./ElementType";

export type OccupiedCell = {
  occupiedById: string;
  occupiedByType: ElementType;
  x: number;
  y: number;
  index: number;
};
