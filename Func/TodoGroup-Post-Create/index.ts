import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoGroupModel } from "../SharedCode/models/TodoGroupModel";
import { TodoGroupService } from "../SharedCode/services/TodoGroupService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Start creating new TodoGroup');

    const group: TodoGroupModel  = req.body;
   
        const productService = new TodoGroupService();
        const res = await productService.addTodoGroup(group)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: res
    };
};

export default httpTrigger;