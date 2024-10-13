import { create } from "zustand";

export type FocusTimeType = {
  id?: string;
  focus_name: string;
  duration: string;
};

type SoundPlayType = {
  isPlay: boolean;
  url:
    | "/sound/pop.wav"
    | "/sound/edit.mp3"
    | "/sound/undone.wav"
    | "/sound/delete.m4a"
    | "/sound/done.m4a"
    | string;
};

type State = {
  works: FocusTimeType[];
  soundPlay: SoundPlayType;
};

type Action = {
  setWorks: (work: FocusTimeType[]) => void;
  setSoundPlay: (soundPlay: SoundPlayType) => void;
};

export const useWorkStore = create<State & Action>((set) => ({
  works: [],
  setWorks: (works) => set({ works }),
  soundPlay: {
    isPlay: false,
    url: "",
  },
  setSoundPlay: (soundPlay) => set({ soundPlay }),
}));
