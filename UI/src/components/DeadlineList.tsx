import { List } from "@material-ui/core";
import { ITodoModel } from "../interfaces";
import TodoItem from "./TodoItem";

interface ITodo {
  id: string;
  inputSearch: string;
  radioValue: string;
}

const DeadlineList: React.FC<ITodo> = ({ inputSearch, radioValue }) => {
  // const { todoGroups } = useTypeSelector((state) => state.groupsList);
  // const todoItems = todoGroups.find((item) => item.id === id)?.todoItems;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!todoItems) {
  //     dispatch(loadTodos(id));
  //   }
  // }, [todoGroups]);

  return (
    <List>
      {/* {todoItems?.length ? (
        todoItems?.map(({ todoName, id, isCompleted, priority, deadline, expired }: ITodoModel) => {
          if (!inputSearch && radioValue === "All") {
            return (
              <TodoItem
                todoName={todoName}
                id={id}
                completed={isCompleted}
                key={id}
                groupId={id}
                priority={priority}
                expired={expired}
                deadline={deadline}
              />
            );
          }})
      ) : (
         <h2>Дел пока нет</h2>
      )} */}
    </List>
  );
};

export default DeadlineList;
