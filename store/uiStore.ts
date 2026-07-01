import { create } from "zustand";

type CursorVariant = "default" | "hover" | "view" | "hidden";

type UIState = {
  menuOpen: boolean;
  toggleMenu: () => void;
  setMenu: (open: boolean) => void;

  loaded: boolean;
  setLoaded: (v: boolean) => void;

  cursorVariant: CursorVariant;
  cursorLabel: string;
  setCursor: (variant: CursorVariant, label?: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  menuOpen: false,
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  setMenu: (open) => set({ menuOpen: open }),

  loaded: false,
  setLoaded: (v) => set({ loaded: v }),

  cursorVariant: "default",
  cursorLabel: "",
  setCursor: (variant, label = "") =>
    set({ cursorVariant: variant, cursorLabel: label }),
}));
