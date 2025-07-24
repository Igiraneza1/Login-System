import { Router } from "express";
import { userRouter } from "./userRoute";

const routers = Router()
const allRotures = [userRouter]
routers.use('/api/v1',...allRotures)
export {routers}