export type GridItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "title" | "image" | "textContent";
};
