export type Status = 'completed' | 'progress' | 'hold' | 'cancelled';
export type Link = 'github' | 'live' | 'private';
export type Tech =
  | 'svelte'
  | 'pixijs'
  | 'unity'
  | 'react'
  | 'tailwind'
  | 'typescript'
  | 'html'
  | 'css'
  | 'unreal_engine'
  | 'c_plus_plus'
  | 'c_sharp'
  | 'go'
  | 'bubbletea'
  | 'cobra'
  | 'cli'
  | 'aws'
  | 'github_pages'
  | 'formspree'
  | 'no_cost'
  | 'firmware'
  | 'pcb_design'
  | 'hardware'
  | 'animation';

export type ImageTagConfig = { text: string; icon: string; iconType: 'material' | 'svg' };
