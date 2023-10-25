export class ClosureTypeEnum {

    static readonly PROCEEDING = new ClosureTypeEnum('PROCEEDING', 'Anónima');
    static readonly NON_PROCEEDING = new ClosureTypeEnum('NON_PROCEEDING', 'Colectiva');
    static readonly RECOMMENDED = new ClosureTypeEnum('RECOMMENDED', 'Individual');
    static readonly PRELIMINARY = new ClosureTypeEnum('PRELIMINARY', 'Individual');

    private constructor(private readonly key: string, public readonly value: string) {};

    toString() {
        return this.key;
    }
}
