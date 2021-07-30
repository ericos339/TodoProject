import { List, makeStyles } from "@material-ui/core";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { ITodoModel } from "../interfaces";
import TodoItem from "./TodoItem";


const useStyles = makeStyles({
  roof: {
    width: "100%",
  },
});
const DeadlineList: React.FC = () => {
  const classes = useStyles()
 const { urgentTodos } = useTypeSelector((state) => state.groupsList);
  const { todoGroups } = useTypeSelector((state) => state.groupsList);
  const testGroup =  todoGroups.filter(group => group.id === "61028a010113a124dc000d3d")
  const testTodos = testGroup[0]?.todoItems

  // const todoItems = todoGroups.find((item) => item.id === id)?.todoItems;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!todoItems) {
  //     dispatch(loadTodos(id));
  //   }
  // }, [todoGroups]);

  return (
    <List className={classes.roof}>
      {testTodos?.length ? (
        testTodos?.map(({ todoName, id, isCompleted, priority, expired, deadline, groupId }: ITodoModel) => {
            return (
              <TodoItem
                todoName={todoName}
                id={id}
                completed={isCompleted}
                key={id}
                groupId={groupId}
                priority={priority}
                expired={expired}
                deadline={deadline}
                isUrgent={true}
              />
            );
          })
      ) : (
         <h2 style={{textAlign: "center"}}>Срочных дел нет</h2>
      )}
    </List>
  );
};

export default DeadlineList;
