export class AlertContextEnum {

    static asArray: AlertContextEnum[] = [];

    static readonly ALLOCATION = new AlertContextEnum('ALLOCATION', 'Alocação');

    private constructor(public readonly key: string, public readonly value: string) {
        AlertContextEnum.asArray.push(this);
    };

    toString() {
        return this.key;
    }
}