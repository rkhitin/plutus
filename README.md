# Plutus
Telegram bot for managing your finances. 

## Tech stack
- Typescript 
- Grammy
- node.js
- MongoDB
- Docker

Deploy on DigitalOcean app platform.

## Database structure

### Users
- telegramId: string

### Categories
- name: string
- userId: string

### Reasons
- name: string
- userId: string
- type: debit | credit

### Accoounts
- name: string
- userId: string
- balance: number

### Transactions
- userId: string
- categoryId: string
- reasonId: string
- accountId: string
- amount: number
- date: Date
- telegramMessageId: string
- comment: string