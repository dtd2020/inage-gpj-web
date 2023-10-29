import { AttachmentModel } from "./attachment-model";
import { ComplainerModel } from "./complainer-model";
import { ProcessUpdateHistoryModel } from "./process-update-history-model";

export interface ProcessModel {
    id: number;
    code: string;
    description: string;
    complainerId: number;
    complainer: ComplainerModel;
    processType: string;
    complaintType: string;
    closureType: string;
    closureStatus: string;
    attachments: AttachmentModel[];
    updateHistory: ProcessUpdateHistoryModel;

}

export interface ProcessTypeModel {
    key: string;
    value: string;
}

export interface ComplaintTypeModel {
    key: string;
    value: string;
}

export interface ClosureTypeModel {
    description: string;
}

export interface ClosureStatusModel {
    key: string;
    value: string;
}