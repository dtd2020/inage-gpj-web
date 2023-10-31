export class ComplainerTypeEnum {

    static asArray: ComplainerTypeEnum[] = [];

    static readonly ANONYMOUS = new ComplainerTypeEnum('ANONYMOUS', 'Anónimo');
    static readonly COLLECTIVE = new ComplainerTypeEnum('COLLECTIVE', 'Colectivo');
    static readonly INDIVIDUAL = new ComplainerTypeEnum('INDIVIDUAL', 'Individual');

    private constructor(public readonly key: string, public readonly value: string) {
        ComplainerTypeEnum.asArray.push(this);
    };

    toString() {
        return this.key;
    }
}
