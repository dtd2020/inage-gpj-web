import { AllocationModel } from "./allocation-model";
import { AttachmentModel } from "./attachment-model";
import { ComplainerModel } from "./complainer-model";
import { PageableMetaModel } from "./pageable-meta-model";
import { ProcessUpdateHistoryModel } from "./process-update-history-model";

export interface ProcessModel {
    id: number;
    code: string;
    description: string;
    complainerId: number;
    complainer: ComplainerModel;
    processType: string;
    complainerType: string;
    closureType: string;
    processStatus: string;
    attachments: AttachmentModel[];
    allocations: AllocationModel[];
    updateHistory: ProcessUpdateHistoryModel;

}

export interface ProcessTypeModel {
    key: string;
    value: string;
}

export interface ComplainerTypeModel {
    key: string;
    value: string;
}

export interface ClosureTypeModel {
    key: string;
    value: string;
}

export interface ProcessStatusModel {
    key: string;
    value: string;
}

export interface ProcessPageModel {
    data: ProcessModel[];
    pageableMeta: PageableMetaModel;
}