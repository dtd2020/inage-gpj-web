
export class ClosureTypeEnum {

    static asArray: ClosureTypeEnum[] = [];

    static readonly PROCEEDING = new ClosureTypeEnum('PROCEEDING', 'Procede');
    static readonly NON_PROCEEDING = new ClosureTypeEnum('NON_PROCEEDING', 'Não procede');
    static readonly RECOMMENDED = new ClosureTypeEnum('RECOMMENDED', 'Recomendado');
    static readonly PRELIMINARY = new ClosureTypeEnum('PRELIMINARY', 'Preliminar');

    private constructor(public readonly key: string, public readonly value: string) {
        ClosureTypeEnum.asArray.push(this);
    };

    toString() {
        return this.key;
    }
}
