# Synq Coin Engine ⚡

Blockchain-inspired Skill Coin transaction system for the Synq platform. Handles secure peer-to-peer skill token transfers, balance management, and transaction history for our skill-based economy.

## 🎯 Features

- *Secure Transactions*: Validated peer-to-peer Skill Coin transfers
- *Wallet Management*: User balance tracking and transaction history
- *Blockchain Integration*: Immutable transaction ledger
- *Real-time Balances*: Instant balance updates after sessions
- *Session Tracking*: Links transactions to specific skill sessions
- *Mining Rewards*: Incentive system for network participation

## 🚀 Quick Start

```javascript
const SkillCoinWallet = require('./wallet');
const SkillCoinTransaction = require('./transaction');

// Create user wallets
const teacher = new SkillCoinWallet('john_doe', 'teacher', 50);
const learner = new SkillCoinWallet('jane_smith', 'learner', 30);

// Execute a skill session transaction
const transaction = new SkillCoinTransaction(
    learner,
    teacher,
    15, // Skill Coins
    'python',
    { sessionId: 'sess_123', duration: '60min' }
);

const result = transaction.execute();
console.log(result);
