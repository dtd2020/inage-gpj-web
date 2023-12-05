export class AlertNextStepEnum {

    static asArray: AlertNextStepEnum[] = [];

    static readonly FOLLOW_UP_ALLOCATION = new AlertNextStepEnum('FOLLOW_UP_ALLOCATION', 'Dar seguimento do processo', 'back-office/allocations/follow-up', 'citezen/processes/follow-up');

    private constructor(public readonly key: string, public readonly value: string, public readonly backOfficeRoute: string, public readonly complainerRoute: string) {
        AlertNextStepEnum.asArray.push(this);
    };

    toString() {
        return this.key;
    }
}