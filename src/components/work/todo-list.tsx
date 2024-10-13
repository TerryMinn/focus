import { FocusTimeType, useWorkStore } from "@/lib/store/useWorkStore";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ConfirmModal from "./confirm-modal";
import { useState } from "react";
import TodoModal from "./todo-modal";
import { toast } from "sonner";
import CustomToast from "../ui/custom-toast";
import { setLocal } from "@/lib/utils";

type TodoItemProps = {} & FocusTimeType;

const TodoItem = ({ duration, focus_name, id }: TodoItemProps) => {
  const { setWorks, works, setSoundPLay } = useWorkStore((state) => ({
    setWorks: state.setWorks,
    works: state.works,
    setSoundPLay: state.setSoundPlay,
  }));
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [editWork, setEditWork] = useState<FocusTimeType | null>(null);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id as string,
    });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemoveWork = () => {
    const removeWork = works.filter((work) => work.id !== id);
    setLocal(removeWork);
    setWorks(removeWork);
    toast.custom((t) => (
      <CustomToast
        t={t}
        headText="Success delete"
        bodyText="Deleted your work 😥"
        variant="error"
      />
    ));
    setSoundPLay({ isPlay: true, url: "/sound/delete.m4a" });
  };

  return (
    <>
      <div
        key={id}
        style={style}
        ref={setNodeRef}
        className="flex justify-between px-5 py-3 shadow-sm bg-white dark:bg-background dark:border-b"
      >
        <div className="flex items-center gap-2">
          <div {...listeners} {...attributes}>
            ⣿
          </div>
          <h1 className="p truncate w-[70px]">{focus_name}</h1>
        </div>

        <div className="flex items-center gap-5">
          <h1 className="h">{duration}</h1>
          <button onClick={() => setDeleteOpen(true)}>
            <MdDeleteOutline className="text-red-500" />
          </button>
          <button onClick={() => setEditWork({ duration, focus_name, id })}>
            <CiEdit />
          </button>
        </div>
      </div>
      <TodoModal
        isOpen={editWork !== null}
        onClose={() => setEditWork(null)}
        editData={editWork}
      />
      <ConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleRemoveWork}
      />
    </>
  );
};

export default TodoItem;
