import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { resolve } from "path";
import { TodoItemService } from "../SharedCode/services/TodoItemService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const id = req.query.id;  
    try{
          const todoItemService = new TodoItemService();
         const todoItemRes = await todoItemService.changeCompletedStatus(id);
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