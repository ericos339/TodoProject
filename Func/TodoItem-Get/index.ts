import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoItemService } from "../SharedCode/services/TodoItemService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try{
        const productService = new TodoItemService();
        const groupId = req.query.id
        const items = await productService.getTodoItems(groupId)
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