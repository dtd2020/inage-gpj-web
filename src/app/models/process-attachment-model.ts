import { AttachmentModel } from "./attachment-model";
import { ProcessModel } from "./process-model";

export interface ProcessAttachmentModel {
    id: number;
    processId: number;
    process: ProcessModel;
    attachmentId: number;
    attachment: AttachmentModel;
}
