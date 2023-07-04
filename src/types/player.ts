export interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (id: string[]) => void;
  reset: () => void;
}
