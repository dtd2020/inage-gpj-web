export class AlertTakenActionEnum {

    static asArray: AlertTakenActionEnum[] = [];

    static readonly PROCESS_ALLOCATED = new AlertTakenActionEnum('PROCESS_ALLOCATED', 'Processo alocado', 'backoffice/allocations/follow-up');

    private constructor(public readonly key: string, public readonly value: string, public readonly route: string) {
        AlertTakenActionEnum.asArray.push(this);
    };

    toString() {
        return this.key;
    }
}