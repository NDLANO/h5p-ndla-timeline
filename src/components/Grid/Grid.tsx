import * as React from "react";
import { GridItem } from "../../types/GridItem";
import styles from "./Grid.module.scss";

type GridProps = {
  items: Array<GridItem>;
};

export const Grid: React.FC<GridProps> = ({ items }) => {
  const children = React.useMemo(() => {
    return items.map(item => (
      <foreignObject
        key={item.id}
        x={item.x}
        y={item.y}
        width={item.width}
        height={item.height}
      />
    ));
  }, [items]);
  return (
    <div className={styles.gridWrapper}>
      <svg viewBox="0 0 100 100" className={styles.grid} width={20} height={12}>
        {children}
      </svg>
    </div>
  );
};
