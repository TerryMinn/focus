import { useWorkStore } from "@/lib/store/useWorkStore";
import { removeMetricSuffix } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { FaSquare } from "react-icons/fa";
import { toast } from "sonner";
import CustomToast from "../ui/custom-toast";
import { ModeToggle } from "../mode-toggle";

type TimeCounterProps = {};

const TimeCounter = ({}: TimeCounterProps) => {
  const { works, setWorks, setSoundPlay } = useWorkStore((state) => ({
    works: state.works,
    setWorks: state.setWorks,
    setSoundPlay: state.setSoundPlay,
  }));
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      works.length >= 1 &&
        setSoundPlay({
          isPlay: true,
          url: "/sound/undone.wav",
        });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (works.length > 0) {
      setTimeLeft(removeMetricSuffix(works[0].duration));
    } else {
      setTimeLeft(0);
    }
  }, [works]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between px-5 h-[59px] shadow-sm border-b items-center">
        <h1 className="h">
          {works.length > 0 ? works[0].focus_name : "Untitle"}
        </h1>
        <div className="flex items-center gap-2">
          <h1 className=" py-1">Total : {works.length}</h1>
          <ModeToggle />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-full">
        <div
          className="text-7xl lg:text-9xl font-bold tabular-nums"
          aria-live="polite"
        >
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-2 py-2">
          <button className="font-bold" onClick={() => setIsRunning(true)}>
            <FaPlay />
          </button>
          <button className="font-bold" onClick={() => setIsRunning(false)}>
            <FaPause />
          </button>
          <button
            className="font-bold text-red-500"
            onClick={() => {
              setIsRunning(false);
              const endWorks = works.filter((work) => work.id !== works[0].id);
              setWorks([...endWorks]);
              toast.custom((t) => (
                <CustomToast
                  t={t}
                  headText="Done work"
                  bodyText="Done your work 😍"
                  variant="success"
                />
              ));
              setSoundPlay({
                isPlay: true,
                url: "/sound/done.m4a",
              });
            }}
          >
            <FaSquare />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeCounter;
