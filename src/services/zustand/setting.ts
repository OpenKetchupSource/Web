import { create } from "zustand";

interface SettingState {
  selectedDate: Date;
  selectedCharacter: string | null;
  setDate: (date: Date) => void;
  setCharacter: (character: string) => void;
}

export const useSettingStore = create<SettingState>((set) => ({
  selectedDate: new Date(),
  selectedCharacter: "앙글이",
  setDate: (date) => set({ selectedDate: date }),
  setCharacter: (character) => set({ selectedCharacter: character }),
}));
