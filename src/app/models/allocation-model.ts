import { PageableMetaModel } from "./pageable-meta-model";
import { ProcessModel, ProcessPageModel } from "./process-model";
import { StaffModel } from "./staff-model";

export interface AllocationModel {
    id: number;
    processId: number;
    staffId: number;
    process: ProcessModel;
    staff: StaffModel;
    status: string;
    closed: boolean;
    allocationComments: AllocationCommentModel[];
}

export interface AllocationPageModel {
    data: AllocationModel[];
    pageableMeta: PageableMetaModel;
}

export interface AllocationCommentModel{
    id: number;
    allocationId: number;
    title: string;
    comment: string;
    authorNuit: string;
    authorName: string;
    from: string;
    createdAt: string;
}

export interface AllocationFollowUpRequestModel{
    allocationId: number;
    allocationStatus: string;
    allocationComment: {
        id: number;
        title: string;
        comment: string;
        authorNuit: string;
        authorName: string;
        from: string;
        createdAt: string;
    }
    
}

export interface BatchAllocationModel {
    staffId: number;
    processIds: number[];
}

export interface SingleAllocationModel {
    staffId: number;
    processIds: number;
}

// export interface AllocationResourceModel {
//     availableProcessesToAllocate: ProcessModel[],
//     staff: StaffModel[]
// }

export interface AllocationResourceModel {
    processPageable: ProcessPageModel,
    staff: StaffModel[]
}
