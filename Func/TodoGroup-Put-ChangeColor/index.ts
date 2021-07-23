import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoGroupService } from "../SharedCode/services/TodoGroupService";


    const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
      const id = req.query.id;  
      
      try{
            const todoGroupService = new TodoGroupService();
            await todoGroupService.changeColorTodoGroup(id, req.body.color);
            context.res = {
                headers: {
                  "Content-Type": "application/json",
                },
                status: 200,
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