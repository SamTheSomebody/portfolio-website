export const TILE_IDS = {
  CENTER: 'center',
  TOP_EDGE: 'top_edge',
  BOTTOM_EDGE: 'bottom_edge',
  LEFT_EDGE: 'left_edge',
  RIGHT_EDGE: 'right_edge',

  TOP_LEFT_CORNER: 'top_left_corner',
  TOP_RIGHT_CORNER: 'top_right_corner',
  BOTTOM_LEFT_CORNER: 'bottom_left_corner',
  BOTTOM_RIGHT_CORNER: 'bottom_right_corner',

  TOP_NO_EDGE: 'top_no_edge',
  BOTTOM_NO_EDGE: 'bottom_no_edge',
  LEFT_NO_EDGE: 'left_no_edge',
  RIGHT_NO_EDGE: 'right_no_edge',

  HORIZONTAL_EDGE: 'horizontal_edge',
  VERTICAL_EDGE: 'vertical_edge',
  FULL_EDGE: 'full_edge',

  LEFT_TALL: 'left_tall',
  RIGHT_TALL: 'right_tall',
  EDGE_TALL: 'edge_tall',
  FULL_TALL: 'full_tall',

  TOP_RAMP_LEFT: 'top_ramp_left',
  TOP_RAMP_RIGHT: 'top_ramp_right',
  BOTTOM_RAMP_LEFT: 'bottom_ramp_left',
  BOTTOM_RAMP_RIGHT: 'bottom_ramp_right',
} as const;

import type { Tile } from '../types/tiles';

// Default island map
export const DEFAULT_MAP: (Tile | null)[][] = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [
    null,
    null,
    null,
    { type: 'top_left_corner', wall: null },
    { type: 'top_edge', wall: null },
    { type: 'top_right_corner', wall: null },
    null,
    null,
    null,
  ],
  [
    null,
    null,
    { type: 'right_no_edge', wall: null },
    { type: 'center', wall: null },
    { type: 'center', wall: null },
    { type: 'center', wall: null },
    { type: 'left_no_edge', wall: null },
    null,
    null,
  ],
  [
    null,
    null,
    { type: null, wall: 'left_tall' },
    { type: 'bottom_left_corner', wall: null },
    { type: 'bottom_edge', wall: null },
    { type: 'bottom_right_corner', wall: null },
    { type: null, wall: 'right_tall' },
    null,
    null,
  ],
  [
    null,
    null,
    null,
    { type: null, wall: 'left_tall' },
    { type: null, wall: 'edge_tall' },
    { type: null, wall: 'right_tall' },
    null,
    null,
    null,
  ],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
];
