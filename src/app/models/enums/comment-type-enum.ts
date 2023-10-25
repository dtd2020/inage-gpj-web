export class CommentTypeEnum {

    static readonly REQUEST_CLIENT_INTERVENTION = new CommentTypeEnum('REQUEST_CLIENT_INTERVENTION', 'Necessidade de intervenção do utente');
    static readonly REQUEST_REALLOCATION = new CommentTypeEnum('REQUEST_REALLOCATION', 'Realocação do processo');
    static readonly CLOSE_PROCESS = new CommentTypeEnum('CLOSE_PROCESS', 'Encerramento do processo');
    static readonly RECORD_ACTIONS = new CommentTypeEnum('RECORD_ACTIONS', 'Acções subsequentes');
    static readonly REQUEST_CLOSURE = new CommentTypeEnum('REQUEST_CLOSURE', 'Tipo de fecho');

    private constructor(private readonly key: string, public readonly value: string) {};

    toString() {
        return this.key;
    }
}
