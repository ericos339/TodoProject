import axios from "axios";
import { IGroupModel, ITodoModel } from "../interfaces";
export const URL_API = "http://localhost:3000/api";

export const getGroups = () => {
  return axios.get(`${URL_API}/TodoGroup-Get`);
};
export const postGroups = (group: IGroupModel) => {
  return axios.post(`${URL_API}/TodoGroup-Post-Create`, group);
};

export const removeGroup = (id: any) => {
  return axios.delete(`${URL_API}/TodoGroup-Delete/?id=${id.id}`);
};

export const putGroupColor = (groupId: number, color: string) => {
  return axios.put(`${URL_API}/TodoGroup-Put-ChangeColor`, { groupId, color });
};

export const getTodos = (id: number) => {
  return axios.get(`${URL_API}/TodoGroup/?id=${id}`);
};

export const postTodo = (todos: ITodoModel, id: number) => {
  return axios.post(`${URL_API}/TodoGroup/${id}/TodoItems`, todos);
};

export const removeTodo = (todoId: number) => {
  return axios.delete(`${URL_API}/TodoItem/${todoId}`);
};

export const completeTodo = (todoId: number) => {
  return axios.put(`${URL_API}/TodoItem/${todoId}`);
};
