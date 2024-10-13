import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TodoHandler from "./components/console/todo-handler";
import TimeCounter from "./components/console/time-counter";
import ReactAudioPlayer from "react-audio-player";
import { useWorkStore } from "./lib/store/useWorkStore";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect } from "react";

const App = () => {
  const { soundPlay, setSoundPlay, setWorks, works } = useWorkStore(
    (state) => ({
      soundPlay: state.soundPlay,
      setSoundPlay: state.setSoundPlay,
      setWorks: state.setWorks,
      works: state.works,
    })
  );

  useEffect(() => {
    const localWorks = localStorage.getItem("works");
    console.log(JSON.parse(localWorks || "[]"));
    setWorks(JSON.parse(localWorks || "[]"));
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-screen w-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={30}>
            <TodoHandler />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={70}>
            <TimeCounter />
          </ResizablePanel>
        </ResizablePanelGroup>
        <ReactAudioPlayer
          src={soundPlay.url}
          autoPlay={soundPlay.isPlay}
          onEnded={() => setSoundPlay({ isPlay: false, url: "" })}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
