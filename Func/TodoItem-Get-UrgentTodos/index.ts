import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoItemService } from "../SharedCode/services/TodoItemService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Getting urgent todos...');
    try{
        const groupId = req.params.count
        const todoItemService = new TodoItemService();
        const items = await todoItemService.getUrgentTodoItems(5)
        context.res = {
            headers: {
              "Content-Type": "application/json",
            },
            status: 200,
            body: items,
          };
    }
    catch (error) {
        console.error(error);
        context.res = {
          status: 500,
          body: "Unhandled exception: " + JSON.stringify(error),
        };
    }
};

export default httpTrigger;