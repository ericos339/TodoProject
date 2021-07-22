import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoGroupService } from "../SharedCode/services/TodoGroupService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {

        const productService = new TodoGroupService();
        const res = await productService.addTodoGroup(req.body)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: res
    };
    return context.res;

};

export default httpTrigger;