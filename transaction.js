class SkillCoinTransaction {
    constructor(sender, receiver, amount, skillType, sessionDetails = {}) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.skillType = skillType;
        this.sessionDetails = sessionDetails;
        this.timestamp = new Date();
        this.transactionId = this.generateId();
        this.status = 'pending';
        this.blockNumber = null;
    }
    
    generateId() {
        return 'txn_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
    
    validateTransaction() {
        // Validate sender has sufficient balance
        if (this.sender.balance < this.amount) {
            throw new Error(Insufficient Skill Coin balance. Required: ${this.amount}, Available: ${this.sender.balance});
        }
        
        // Validate amount is positive
        if (this.amount <= 0) {
            throw new Error('Transaction amount must be positive');
        }
        
        // Validate skill type exists
        if (!this.skillType || this.skillType.trim() === '') {
            throw new Error('Skill type must be specified');
        }
        
        return true;
    }
    
    execute() {
        try {
            console.log(🔄 Processing transaction ${this.transactionId}...);
            this.validateTransaction();
            
            // Create transaction record
            const transactionRecord = {
                id: this.transactionId,
                from: this.sender.userId,
                to: this.receiver.userId,
                amount: this.amount,
                skill: this.skillType,
                timestamp: this.timestamp,
                session: this.sessionDetails
            };
            
            // Update balances
            this.sender.balance -= this.amount;
            this.receiver.balance += this.amount;
            
            // Add to transaction history
            this.sender.transactionHistory.push({
                ...transactionRecord,
                type: 'sent',
                newBalance: this.sender.balance
            });
            
            this.receiver.transactionHistory.push({
                ...transactionRecord,
                type: 'received', 
                newBalance: this.receiver.balance
            });
            
            this.status = 'completed';
            
            console.log(✅ Transaction ${this.transactionId} completed successfully);
            
            return {
                success: true,
                transactionId: this.transactionId,
                from: this.sender.userId,
                to: this.receiver.userId,
                amount: this.amount,
                senderNewBalance: this.sender.balance,
                receiverNewBalance: this.receiver.balance,
                timestamp: this.timestamp
            };
            
        } catch (error) {
            this.status = 'failed';
            console.error(❌ Transaction ${this.transactionId} failed:, error.message);
            return {
                success: false,
                error: error.message,
                transactionId: this.transactionId
            };
        }
    }
    
    toJSON() {
        return {
            transactionId: this.transactionId,
            from: this.sender.userId,
            to: this.receiver.userId,
            amount: this.amount,
            skill: this.skillType,
            status: this.status,
            timestamp: this.timestamp,
            sessionDetails: this.sessionDetails
        };
    }
}

module.exports = SkillCoinTransaction;
