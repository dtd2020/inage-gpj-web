export class ClosureStatusEnum {

    static asArray: ClosureStatusEnum[] = [];

    static readonly PENDING = new ClosureStatusEnum('PENDING', 'Pendente');
    static readonly ASSESSMENT = new ClosureStatusEnum('ASSESSMENT', 'Avalicação pelo acessor');
    static readonly AWAITING_CLIENT_RESPONSE = new ClosureStatusEnum('AWAITING_COMPLAINER_RESPONSE', 'Aguardando resposta do utente');
    static readonly ALLOCATED = new ClosureStatusEnum('ALLOCATED', 'Alocado');
    static readonly IN_PROGRESS = new ClosureStatusEnum('IN_PROGRESS', 'Em progresso');
    static readonly CLOSED = new ClosureStatusEnum('CLOSED', 'Fechado');

    private constructor(public readonly key: string, public readonly value: string) {
        ClosureStatusEnum.asArray.push(this);
    };

    toString() {
        return this.key;
    }
}
