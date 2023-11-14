export interface AttachmentModel {
    id: number;
    originalFileName: string;
    fileName: string;
    file: File;
    fileReaded: string | null;
    fileType: string;
    processId: number
}

export interface AttachmentResponseModel {
    id: number;
}

export interface AttachmentFormDataRequest {
    attachments: AttachmentModel[];
}
