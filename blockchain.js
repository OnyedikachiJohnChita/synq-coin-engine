class SkillCoinBlockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.difficulty = 2;
        this.miningReward = 5;
        this.createGenesisBlock();
    }
    
    createGenesisBlock() {
        const genesisBlock = {
            index: 0,
            timestamp: new Date(),
            transactions: [],
            previousHash: '0',
            hash: this.calculateHash(0, new Date(), [], '0'),
            nonce: 0
        };
        this.chain.push(genesisBlock);
    }
    
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    
    minePendingTransactions(miningRewardAddress) {
        const block = {
            index: this.chain.length,
            timestamp: new Date(),
            transactions: this.pendingTransactions,
            previousHash: this.getLatestBlock().hash,
            nonce: 0
        };
        
        block.hash = this.calculateHash(block.index, block.timestamp, block.transactions, block.previousHash, block.nonce);
        
        console.log('⛏  Mining block...');
        while (block.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join('0')) {
            block.nonce++;
            block.hash = this.calculateHash(block.index, block.timestamp, block.transactions, block.previousHash, block.nonce);
        }
        
        console.log('✅ Block successfully mined!');
        this.chain.push(block);
        
        // Reset pending transactions and give mining reward
        this.pendingTransactions = [
            {
                from: null,
                to: miningRewardAddress,
                amount: this.miningReward,
                type: 'mining_reward',
                timestamp: new Date()
            }
        ];
    }
    
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
    
    calculateHash(index, timestamp, transactions, previousHash, nonce = 0) {
        return require('crypto')
            .createHash('sha256')
            .update(index + timestamp + JSON.stringify(transactions) + previousHash + nonce)
            .digest('hex');
    }
    
    getBalanceOfAddress(address) {
        let balance = 0;
        
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.from === address) {
                    balance -= trans.amount;
                }
                
                if (trans.to === address) {
                    balance += trans.amount;
                }
            }
        }
        
        return balance;
    }
    
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            
            // Check if current block hash is valid
            if (currentBlock.hash !== this.calculateHash(
                currentBlock.index,
                currentBlock.timestamp,
                currentBlock.transactions,
                currentBlock.previousHash,
                currentBlock.nonce
            )) {
                return false;
            }
            
            // Check if previous hash matches
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        
        return true;
    }
    
    getTransactionHistory(address) {
        const transactions = [];
        
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.from === address || trans.to === address) {
                    transactions.push({
                        ...trans,
                        blockIndex: block.index,
                        confirmed: true
                    });
                }
            }
        }
        
        return transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
}

module.exports = SkillCoinBlockchain;
