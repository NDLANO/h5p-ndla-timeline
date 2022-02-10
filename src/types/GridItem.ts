import { BlockType } from "./BlockType";

export type GridItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: BlockType;
};
