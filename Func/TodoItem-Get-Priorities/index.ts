import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoItemService } from "../SharedCode/services/TodoItemService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try{
        const productService = new TodoItemService();
        const groups = await productService.getPriorities()
        context.res = {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
            body: groups,
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