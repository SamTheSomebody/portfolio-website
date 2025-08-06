export type TileType =
  | 'top_left_corner'
  | 'top_edge'
  | 'top_right_corner'
  | 'left_edge'
  | 'center'
  | 'right_edge'
  | 'bottom_left_corner'
  | 'bottom_edge'
  | 'bottom_right_corner'
  | 'horizontal_edge'
  | 'vertical_edge'
  | 'full_edge'
  | 'left_no_edge'
  | 'right_no_edge'
  | 'top_no_edge'
  | 'bottom_no_edge';

export type WallType =
  | 'left_shallow'
  | 'right_shallow'
  | 'edge_shallow'
  | 'full_shallow'
  | 'left_tall'
  | 'right_tall'
  | 'edge_tall'
  | 'full_tall'
  | null;

export interface CollisionConfig {
  walkable: boolean;
  leftLimit?: number;
  rightLimit?: number;
  topLimit?: number;
  bottomLimit?: number;
}

export type Tile = {
  type: TileType;
  wall: WallType;
  collision?: CollisionConfig;
};

export type TileMap = {
  tiles: Tile[][];
};
