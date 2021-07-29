import { List } from "@material-ui/core";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { ITodoModel } from "../interfaces";
import TodoItem from "./TodoItem";



const DeadlineList: React.FC = () => {
 const { urgentTodos } = useTypeSelector((state) => state.groupsList);
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
      {urgentTodos?.length ? (
        urgentTodos?.map(({ todoName, id, isCompleted, groupName }: ITodoModel) => {
            return (
              // <TodoItem
              //   todoName={todoName}
              //   id={id}
              //   completed={isCompleted}
              //   key={id}
              //   groupId={id}
              // />
              <h2>Туду</h2>
            );
          })
      ) : (
         <h2 style={{textAlign: "center"}}>Срочных дел нет</h2>
      )}
    </List>
  );
};

export default DeadlineList;
