export class UserTypeEnum {

    static asArray: UserTypeEnum[] = [];

    static readonly CITEZEN = new UserTypeEnum('CITEZEN', 'Cidadão comum');
    static readonly STAFF = new UserTypeEnum('STAFF', 'Pessoal de apoio');

    private constructor(public readonly key: string, public readonly value: string) {
        UserTypeEnum.asArray.push(this);
    };

    toString() {
        return this.key;
    }
}