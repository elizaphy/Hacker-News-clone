export interface HackerNewsItem {
  id: number;
  title?: string;
  url?: string;
  text?: string;
  by: string;
  time: number;
  score?: number;
  descendants?: number;
  kids?: number[];
  type: 'story' | 'comment' | 'job' | 'poll' | 'pollopt';
  parent?: number;
  deleted?: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}
