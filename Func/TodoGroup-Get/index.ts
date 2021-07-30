import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoGroupModel } from "../SharedCode/models/TodoGroupModel";
import { TodoGroupService } from "../SharedCode/services/TodoGroupService";


    const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
        try{
            const productService = new TodoGroupService();
            const groups = await productService.getTodoGroups()
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