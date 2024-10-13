import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FocusTimeType, useWorkStore } from "@/lib/store/useWorkStore";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { toast } from "sonner";
import CustomToast from "../ui/custom-toast";
import { setLocal } from "@/lib/utils";

type TodoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editData?: FocusTimeType | null;
};

const FocusTime: FocusTimeType[] = [
  {
    focus_name: "Long",
    duration: "1h",
  },
  {
    focus_name: "Short",
    duration: "15m",
  },
  {
    focus_name: "Relax",
    duration: "30m",
  },
];

const formSchema = z.object({
  work: z.string().min(2, {
    message: "work must be at least 2 characters.",
  }),
  time: z.enum(
    FocusTime.map((time) => time.duration) as [string, ...string[]],
    {
      errorMap: () => ({ message: "Please select a valid option" }),
    }
  ),
});

const TodoModal = ({ isOpen, onClose, editData }: TodoModalProps) => {
  const { works, setWorks, setSoundPlay } = useWorkStore((state) => ({
    works: state.works,
    setWorks: state.setWorks,
    setSoundPlay: state.setSoundPlay,
  }));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      work: "",
      time: "",
    },
  });

  useEffect(() => {
    if (editData) {
      form.setValue("work", editData.focus_name);
      form.setValue("time", editData.duration);
    }
  }, [editData]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (editData) {
      const editWork = works.map((work) =>
        work.id === editData.id
          ? { focus_name: data.work, duration: data.time, id: editData.id }
          : work
      );
      setWorks([...editWork]);
      setLocal([...editWork]);
      toast.custom((t) => (
        <CustomToast
          t={t}
          headText="Success edit"
          bodyText="Updated your work 🥰"
          variant="success"
        />
      ));
      setSoundPlay({ isPlay: true, url: "/sound/edit.mp3" });
    } else {
      setWorks([
        ...works,
        {
          id: nanoid(),
          focus_name: data.work,
          duration: data.time,
        },
      ]);
      setLocal([
        ...works,
        {
          id: nanoid(),
          focus_name: data.work,
          duration: data.time,
        },
      ]);
      toast.custom((t) => (
        <CustomToast
          t={t}
          headText="Success create"
          bodyText="Created your work 😇"
          variant="success"
        />
      ));

      setSoundPlay({ isPlay: true, url: "/sound/pop.wav" });
    }
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => (onClose(), form.reset())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Focus Item 🧠</DialogTitle>
          <DialogDescription>
            Add a new focus item to your list. set your specifyed time.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="work"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-5">
                    <FormLabel>Work</FormLabel>
                    <FormControl>
                      <Input placeholder="I am work for...?" {...field} />
                    </FormControl>
                  </div>
                  <FormDescription>
                    what do you want to focus on?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-5">
                    <FormLabel>Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a focus time for your work." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FocusTime.map((time) => (
                          <SelectItem key={time.duration} value={time.duration}>
                            {time.focus_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormDescription>
                    You can manage focus time in here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoModal;
