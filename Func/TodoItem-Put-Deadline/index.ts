import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoItemService } from "../SharedCode/services/TodoItemService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Start Updating Deadline');
    try {
        const id = req.params.id;
        const newDeadline = new Date(req.body.deadline);
        const todoItemService = new TodoItemService();
        const todoItemRes = await todoItemService.changeDeadline(id, newDeadline);
        context.res = {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
            body: todoItemRes
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