class SkillCoinWallet {
    constructor(userId, userType, initialBalance = 10) {
        this.userId = userId;
        this.userType = userType; // 'teacher' or 'learner'
        this.balance = initialBalance; // Start with 10 Skill Coins
        this.transactionHistory = [];
        this.createdAt = new Date();
        this.lastUpdated = new Date();
    }
    
    earnCoins(amount, reason, sessionDetails = {}) {
        if (amount <= 0) {
            throw new Error('Earn amount must be positive');
        }
        
        const oldBalance = this.balance;
        this.balance += amount;
        this.lastUpdated = new Date();
        
        const transaction = {
            type: 'earn',
            amount: amount,
            reason: reason,
            oldBalance: oldBalance,
            newBalance: this.balance,
            timestamp: new Date(),
            sessionDetails: sessionDetails,
            transactionId: 'earn_' + Date.now()
        };
        
        this.transactionHistory.push(transaction);
        
        console.log(💰 ${this.userId} earned ${amount} Skill Coins for: ${reason});
        console.log(`   New balance: ${this.balance} coins`);
        
        return transaction;
    }
    
    spendCoins(amount, reason, recipientId = null) {
        if (amount <= 0) {
            throw new Error('Spend amount must be positive');
        }
        
        if (this.balance < amount) {
            throw new Error(Insufficient balance. Required: ${amount}, Available: ${this.balance});
        }
        
        const oldBalance = this.balance;
        this.balance -= amount;
        this.lastUpdated = new Date();
        
        const transaction = {
            type: 'spend',
            amount: amount,
            reason: reason,
            recipient: recipientId,
            oldBalance: oldBalance,
            newBalance: this.balance,
            timestamp: new Date(),
            transactionId: 'spend_' + Date.now()
        };
        
        this.transactionHistory.push(transaction);
        
        console.log(💸 ${this.userId} spent ${amount} Skill Coins for: ${reason});
        console.log(`   New balance: ${this.balance} coins`);
        
        return transaction;
    }
    
    getBalance() {
        return {
            userId: this.userId,
            balance: this.balance,
            lastUpdated: this.lastUpdated
        };
    }
    
    getTransactionHistory(limit = 10) {
        return this.transactionHistory
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
    }
    
    getEarningsReport() {
        const earnings = this.transactionHistory.filter(t => t.type === 'earn');
        const totalEarned = earnings.reduce((sum, t) => sum + t.amount, 0);
        
        return {
            totalEarned: totalEarned,
            totalTransactions: earnings.length,
            averageEarning: earnings.length > 0 ? totalEarned / earnings.length : 0,
            recentEarnings: earnings.slice(0, 5)
        };
    }
    
    toJSON() {
        return {
            userId: this.userId,
            userType: this.userType,
            balance: this.balance,
            totalTransactions: this.transactionHistory.length,
            createdAt: this.createdAt,
            lastUpdated: this.lastUpdated
        };
    }
}

module.exports = SkillCoinWallet;
