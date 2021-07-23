import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ChangeColorRequest } from "../SharedCode/models/ChangeColorRequest";
import { TodoGroupService } from "../SharedCode/services/TodoGroupService";


    const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
      const changeColorRequest: ChangeColorRequest = req.body;  
      
      try{
            const todoGroupService = new TodoGroupService();
            const group = await todoGroupService.changeColorTodoGroup(changeColorRequest.groupId, changeColorRequest.color);
            context.res = {
                headers: {
                  "Content-Type": "application/json",
                },
                status: 200,
                body: group
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