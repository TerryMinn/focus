import { Cross1Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";

type SuccessToastProps = {
  t: string | number | undefined;
  headText: string;
  bodyText: string;
  variant: "success" | "error";
};

const CustomToast = ({ t, headText, bodyText, variant }: SuccessToastProps) => {
  return (
    <div
      className={`border-l-2 border-y border-r ${
        variant === "error" ? "border-l-red-500" : "border-l-blue-500"
      } w-[350px] p-4 rounded-md shadow-sm bg-white dark:bg-background dark:border-b`}
    >
      <div className="flex justify-between items-center">
        <h1 className="h">{headText}</h1>
        <button>
          <Cross1Icon onClick={() => toast.dismiss(t)} />
        </button>
      </div>
      <div>{bodyText}</div>
    </div>
  );
};

export default CustomToast;
