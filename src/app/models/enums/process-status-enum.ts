export class ProcessStatusEnum {

    static asArray: ProcessStatusEnum[] = [];

    static readonly PENDING = new ProcessStatusEnum('PENDING', 'Pendente');
    static readonly ASSESSMENT_ACESSOR = new ProcessStatusEnum('ASSESSMENT_ACESSOR', 'Avalicação em progresso-acessor');
    static readonly AWAITING_CLIENT_RESPONSE = new ProcessStatusEnum('AWAITING_COMPLAINER_RESPONSE', 'Aguardando resposta do utente');
    static readonly ALLOCATED = new ProcessStatusEnum('ALLOCATED', 'Alocado');
    static readonly IN_PROGRESS = new ProcessStatusEnum('AWAITING_COORDINATOR_ITERVIEW', 'Aguardando intervenção do coordenador');
    static readonly CLOSED = new ProcessStatusEnum('CLOSED', 'Fechado');

    private constructor(public readonly key: string, public readonly value: string) {
        ProcessStatusEnum.asArray.push(this);
    };

    toString() {
        return this.key;
    }
}
