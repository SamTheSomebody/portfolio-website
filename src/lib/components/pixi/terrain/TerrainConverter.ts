import type { Tile, TileType, WallType } from '../types/tiles';

export function convert(map: number[][]): Tile[][] {
  map = validateMap(map);
  const tiles: Tile[][] = [];
  for (let y = 1; y < map.length - 1; y++) {
    for (let x = 1; x < map[y].length - 1; x++) {
      const height = map[y][x];
      const segment = map.slice(y - 1, y + 2).map(row => row.slice(x - 1, x + 2));
      const tile = getTile(segment);
      tiles[y][x] = tile;
    }
  }
  return tiles;
}

function validateMap(map: number[][]) {
  if (map.length < 2 || map[0].length < 2) {
    throw new Error('Map is too small');
  }
  const needsLeftPad = map[0].some(height => height !== 0);
  const needsRightPad = map[map.length - 1].some(height => height !== 0);
  const needsBottomPad = map.some(row => row[0] !== 0);
  const needsTopPad = map.some(row => row[row.length - 1] !== 0);
  if (needsLeftPad) {
    map.forEach(row => row.unshift(0));
  }
  if (needsRightPad) {
    map.forEach(row => row.push(0));
  }
  if (needsTopPad) {
    map.unshift(new Array(map[0].length).fill(0));
  }
  if (needsBottomPad) {
    map.push(new Array(map[0].length).fill(0));
  }
  return map;
}

function getTile(segment: number[][]): Tile {
  const height = segment[1][1];
  for (let y = 0; y < segment.length; y++) {
    for (let x = 0; x < segment[y].length; x++) {
      segment[y][x] -= height;
      if (Math.abs(segment[y][x]) > 1) {
        throw new Error('Tile is too tall or too short');
      }
    }
  }
  const topLeft = segment[0][0];
  const topRight = segment[0][2];
  const topCenter = segment[0][1];
  const leftCenter = segment[1][0];
  const rightCenter = segment[1][2];
  const bottomCenter = segment[2][1];

  let wall: WallType = null;
  if (topCenter > height) {
    const left = topLeft > height;
    const right = topRight > height;
    if (left && right) {
      wall = 'edge_tall';
    } else if (left) {
      wall = 'left_tall';
    } else if (right) {
      wall = 'right_tall';
    } else {
      wall = 'full_tall';
    }
  }

  let type: TileType = 'center';
  const isTop = topCenter < height;
  const isLeft = leftCenter < height;
  const isRight = rightCenter < height;
  const isBottom = bottomCenter < height;

  if (isTop && isLeft && isRight && isBottom) {
    type = 'full_edge';
  } else if (isTop && isLeft && isRight) {
    type = 'bottom_no_edge';
  } else if (isTop && isLeft && isBottom) {
    type = 'right_no_edge';
  } else if (isTop && isRight && isBottom) {
    type = 'left_no_edge';
  } else if (isLeft && isRight && isBottom) {
    type = 'top_no_edge';
  } else if (isTop && isBottom) {
    type = 'horizontal_edge';
  } else if (isLeft && isRight) {
    type = 'vertical_edge';
  } else if (isTop) {
    type = 'top_edge';
  } else if (isLeft) {
    type = 'left_edge';
  } else if (isRight) {
    type = 'right_edge';
  } else if (isBottom) {
    type = 'bottom_edge';
  }

  return { type, wall };
}
