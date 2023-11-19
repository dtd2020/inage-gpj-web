import { PageableMetaModel } from "./pageable-meta-model";

export interface ComplainerModel {
    id: number;
    name: string;
    nuit: string;
    email: string;
    mobile: string;
    address: string;
    userId: number;
}

export interface ComplainerPageModel {
    data: ComplainerModel[];
    pageableMeta: PageableMetaModel;
}
