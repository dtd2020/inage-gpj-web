import { ProcessModel } from "./process-model";
import { StaffModel } from "./staff-model";

export interface AllocationModel {

}

export interface AllocationBatchModel {
    staffId: number;
    processIds: number[];
}

export interface AllocationResourceModel {
    availableProcessesToAllocate: ProcessModel[],
    staff: StaffModel[]
}
