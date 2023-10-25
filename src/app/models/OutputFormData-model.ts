import { AttachmentModel } from "./attachment-model";
import { ComplainerModel } from "./complainer-model";
import { ProcessModel } from "./process-model";

export interface ProcessDataOutputForm {
  process: ProcessModel,
  stepDirection: string
}

export interface ComplainerOutputForm {
  complainer: ComplainerModel,
  stepDirection: string
}

export interface AttachmentOutputForm {
  attachments: AttachmentModel[],
  stepDirection: string
}

export interface DetailsOutputForm {
  stepDirection: string
}