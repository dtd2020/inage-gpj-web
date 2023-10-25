export class ClosureStatusEnum {

    static readonly PENDING = new ClosureStatusEnum('PENDING', 'Pendente');
    static readonly AWAITING_CLIENT_RESPONSE = new ClosureStatusEnum('AWAITING_CLIENT_RESPONSE', 'Aguardando resposta do utente');
    static readonly ALLOCATED = new ClosureStatusEnum('ALLOCATED', 'Alocado');
    static readonly IN_PROGRESS = new ClosureStatusEnum('IN_PROGRESS', 'Em progresso');
    static readonly CLOSED = new ClosureStatusEnum('CLOSED', 'Fechado');

    private constructor(private readonly key: string, public readonly value: string) {};

    toString() {
        return this.key;
    }
}
