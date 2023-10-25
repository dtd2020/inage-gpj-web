export class ProcessTypeEnum {

    static asArray: ProcessTypeEnum[] = [];

    static readonly PETITION = new ProcessTypeEnum('PETITION', 'Petição');
    static readonly COMPLAINT = new ProcessTypeEnum('COMPLAINT', 'Reclamação');
    static readonly OFFENSE = new ProcessTypeEnum('OFFENSE', 'Queixa');

    private constructor(public readonly key: string, public readonly value: string) {
        ProcessTypeEnum.asArray.push(this);
    };

    toString() {
        return this.key;
    }
}

