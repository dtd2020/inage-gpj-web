export class StepDirectionEnum {

    static readonly PREVIOUS = new StepDirectionEnum('PREVIOUS', 'previous');
    static readonly NEXT = new StepDirectionEnum('NEXT', 'next');

    private constructor(private readonly key: string, public readonly value: string) {};

    toString() {
        return this.key;
    }
}
