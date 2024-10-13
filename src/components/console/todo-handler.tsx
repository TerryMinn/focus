import { FaPlus } from "react-icons/fa6";
import TodoModal from "../work/todo-modal";
import { useState } from "react";
import { useWorkStore } from "@/lib/store/useWorkStore";
import TodoItem from "../work/todo-list";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

type TodoHandlerProps = {};

const TodoHandler = ({}: TodoHandlerProps) => {
  const { works, setWorks } = useWorkStore((state) => ({
    works: state.works,
    setWorks: state.setWorks,
  }));
  const [addTodo, setAddTodo] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (active.id !== over?.id) {
      const oldIndex = works.findIndex((work) => work.id === active.id);
      const newIndex = works.findIndex((work) => work.id === over?.id);
      const newWorks = arrayMove(works, oldIndex, newIndex);
      setWorks(newWorks);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between px-5 py-3 shadow-sm border-b items-center">
          <h1 className="h">Focus</h1>
          <button
            onClick={() => setAddTodo(true)}
            className="border p-2 rounded cursor-pointer hover:bg-gray-300 duration-500"
          >
            <FaPlus />
          </button>
        </div>
        <div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={works as unknown as string[]}
              strategy={verticalListSortingStrategy}
            >
              {works.map((work) => (
                <TodoItem key={work.id} {...work} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <TodoModal isOpen={addTodo} onClose={() => setAddTodo(false)} />
    </>
  );
};

export default TodoHandler;
