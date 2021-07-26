import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoItemModel } from "../SharedCode/models/TodoItemModel";
import { TodoItemService } from "../SharedCode/services/TodoItemService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Start creating new TodoItem');

    const item: TodoItemModel  = req.body;
    const groupId = req.query.id
        const productService = new TodoItemService();
        const res = await productService.addTodoItem(item, groupId)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: res
    };

};

export default httpTrigger;