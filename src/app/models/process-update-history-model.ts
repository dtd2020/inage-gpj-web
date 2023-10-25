import { ProcessModel } from "./process-model";
import { StaffRoleModel } from "./staff-model";

export interface ProcessUpdateHistoryModel {
    id: number;
    processId: number;
    process: ProcessModel;
    staffId: number;
    staffRole: StaffRoleModel;
    comment: string;
    commentType: CommentTypeModel;
}

export interface CommentTypeModel {
    description: string;
}
