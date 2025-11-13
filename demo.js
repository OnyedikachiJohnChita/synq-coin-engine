const SkillCoinWallet = require('./wallet');
const SkillCoinTransaction = require('./transaction');
const SkillCoinBlockchain = require('./blockchain');

console.log('🚀 Synq Skill Coin Engine Demo');
console.log('=' .repeat(50));

// Create wallets for demo users
const teacherWallet = new SkillCoinWallet('teacher_john', 'teacher', 50);
const learnerWallet = new SkillCoinWallet('learner_sarah', 'learner', 30);

console.log('\n👤 Initial Balances:');
console.log(Teacher ${teacherWallet.userId}: ${teacherWallet.balance} Skill Coins);
console.log(Learner ${learnerWallet.userId}: ${learnerWallet.balance} Skill Coins);

// Simulate a skill session transaction
console.log('\n🎯 Simulating Skill Session...');
console.log('Sarah wants to learn Python from John');

const sessionTransaction = new SkillCoinTransaction(
    learnerWallet,
    teacherWallet,
    15, // 15 Skill Coins for the session
    'python',
    {
        sessionId: 'sess_001',
        duration: '60 minutes',
        skillLevel: 'beginner',
        topic: 'Python Basics'
    }
);

// Execute the transaction
const result = sessionTransaction.execute();
console.log('\n📊 Transaction Result:');
console.log(result);

// Show updated balances
console.log('\n💰 Updated Balances:');
console.log(Teacher ${teacherWallet.userId}: ${teacherWallet.balance} Skill Coins);
console.log(Learner ${learnerWallet.userId}: ${learnerWallet.balance} Skill Coins);

// Demonstrate earning coins
console.log('\n🌟 Teacher earns coins for completing sessions:');
teacherWallet.earnCoins(10, 'Completed advanced JavaScript session', {
    sessionId: 'sess_002',
    student: 'learner_mike'
});

// Show transaction history
console.log('\n📋 Recent Transaction History:');
console.log('Teacher Transactions:', teacherWallet.getTransactionHistory(3));
console.log('Learner Transactions:', learnerWallet.getTransactionHistory(3));

// Blockchain demo
console.log('\n⛓  Blockchain Demo:');
const synqChain = new SkillCoinBlockchain();
synqChain.createTransaction({
    from: 'user1',
    to: 'user2',
    amount: 10,
    skill: 'react',
    timestamp: new Date()
});

synqChain.minePendingTransactions('miner_address');
console.log('Blockchain length:', synqChain.chain.length);
console.log('Is chain valid?', synqChain.isChainValid());

console.log('\n🎉 Demo completed!');
console.log('This demonstrates the core Skill Coin economy powering Synq platform.');
