import { Blockchain } from "./blockchain";
import { GenericNode } from "./generic-node";
import { Account } from "./account";
import { generateMnemonics } from "./mnemonics-generator";

export default class Wallet {
    private mnemonics: string;
    private seed: string;
    private derivation;

    private nodes: Map<Blockchain, GenericNode> = new Map();
    private accounts: Map<Blockchain, Account[]> = new Map();

    constructor(mnemonics?: string) {
        if (mnemonics) {
            this.mnemonics = mnemonics;
        } else {
            this.mnemonics = generateMnemonics("en");
        }

        // calculate seed and setup derivation
    }

    getAccounts(blockchain: Blockchain): Account[] {
        return this.accounts.get(blockchain);
    }

    getNode(blockchain: Blockchain): GenericNode {
        return this.nodes.get(blockchain);
    }

    getBlockchain(blockchain: Blockchain) {
        return {
            getNode: () => this.getNode(blockchain),
            getAccounts: () => this.getAccounts(blockchain),
            createAccount: () => this.createAccount(blockchain),
            importAccount: (account: Account) => this.import(account)
        }
    }

    createAccount(blockchain: Blockchain): Account {
        return new Account();
    }

    import(account: Account) {}

    toJson() {}
    static fromJson() {}
}