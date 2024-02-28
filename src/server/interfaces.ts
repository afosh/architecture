import { Router } from "express";
export default interface IWebController {
  path: string;
  apiVersion: string;
  router: Router;
}
