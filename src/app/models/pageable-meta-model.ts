export interface PageableMetaModel {
    totalPages: number;
    totalElements: number;
	pageNumber: number;
	pageSize: number;
	last: boolean;
	first: boolean;
	sorted: boolean;
}

export interface PageRequestModel {
	offset: number;
	pageSize: number;
	sortBy: SortByModel[];
}

export interface SortByModel {
	direction: string;
	property: string;
}
