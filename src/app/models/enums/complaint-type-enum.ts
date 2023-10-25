export class ComplaintTypeEnum {

    static asArray: ComplaintTypeEnum[] = [];

    static readonly ANONYMOUS = new ComplaintTypeEnum('ANONYMOUS', 'Anónimo');
    static readonly COLLECTIVE = new ComplaintTypeEnum('COLLECTIVE', 'Colectivo');
    static readonly INDIVIDUAL = new ComplaintTypeEnum('INDIVIDUAL', 'Individual');

    private constructor(public readonly key: string, public readonly value: string) {
        ComplaintTypeEnum.asArray.push(this);
    };

    toString() {
        return this.key;
    }
}
