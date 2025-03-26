className CompteBancaire {
    public name: string;
    private solde: number;

    constructor(name: string) {
        this.name = name;
        this.solde = 0;
    }

    getSolde() {
        return this.solde;
    }

    deposer(montent: number) {
        this.solde += montent;
    }

    retirer(montent: number) {
        if (montent > this.solde) {
            this.solde -= montent;
        }
    }
}