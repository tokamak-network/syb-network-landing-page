import { atom } from 'jotai';

// Tab state
export type TabType = 'graph' | 'transactions';
export const activeTabAtom = atom<TabType>('graph');

// Selected node for the network graph
export const selectedNodeAtom = atom<string | null>(null);

// Pagination state for transactions
export const txPageAtom = atom<number>(1);
export const txPageSizeAtom = atom<number>(50);

