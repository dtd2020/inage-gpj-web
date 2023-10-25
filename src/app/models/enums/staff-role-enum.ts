export class StaffRoleEnum {

    static readonly ACCESSOR = new StaffRoleEnum('ACCESSOR', 'Acessor');
    static readonly COORDINATOR = new StaffRoleEnum('COORDINATOR', 'Coordenador');
    static readonly TECHNICIAN = new StaffRoleEnum('TECHNICIAN', 'Técnico');
    static readonly PROVIDER = new StaffRoleEnum('PROVIDER', 'Provedor');

    private constructor(private readonly key: string, public readonly value: string) {};

    toString() {
        return this.key;
    }
}
