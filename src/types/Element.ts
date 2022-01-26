import { ElementType } from "./ElementType";
import { Position } from "./Position";
import { Size } from "./Size";

/* TODO: Find a better name */
export type Element = {
  id: string;
  type: ElementType;
  position: Position;
  size: Size;
};
