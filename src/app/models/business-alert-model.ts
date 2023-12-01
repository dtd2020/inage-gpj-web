export interface BusinessAlertModel {
    id: number;
    context: string;
    contextEntityId: string;
    description: string;
    takenAction: string;
    nextStep: string;
    marked: boolean;
    userId: number;
}
