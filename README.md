# ORDER 66 LIGHT SIDE: A One stop eCommerce warranty system using NFTs 
### GitHub-Link: **https://github.com/Knight-Night-666/Flipkart-GRID-challenge**
### Main branch: **pakka-promise**

## Problem Statement:

The objective is to replace the physical warranty and have block chain based warranty using NFT which will ensure
authenticity and security.
-Converting ownership authenticity and product warranty cards into decaying NFTs.
- For instance, allow brands and retailers to introduce an NFT for each of their products, which allows
customers to receive the physical product along with a digital version of it.
- Customers can then use the digital NFT to verify the authenticity of their product, prove their ownership of
their product, and transfer ownership of them upon resale.
- The brand/retailer should also be able to tie the digital NFT to its warranty program, allowing owners to track
repairs and replacements to the original item.
- Decay the NFT once the warranty is over.
- You can use the Polygon blockchain to deploy your solution and demo the final product as a web prototype



## What it does:
- It allows the retailers to issue a digital warranty by creating a decaying NFT and transfering it to the customer post purchase.
- When transferring the NFT, a mail will be sent to the recipient, containing details about the warrant.
- Allows the customer to verify his/her warranty (we did this by implementing a decaying NFT).
- Allows the retailer to view all listed as well as sold NFTs.
- Allows the customers to view their purchase history.
- Allows the customer to re-sell the products they own by tranfering the Warranty NFT to the appropriate buyer.

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Ethers](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ipfs](https://ipfs.io/) (Metadata storage)
- [React routers](https://v5.reactrouter.com/) (Navigational components)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/), should work with any node version below 16.5.0
- Install [Hardhat](https://hardhat.org/)

## Installation and Instructions:

1. Clone the project by
```
https://github.com/Knight-Night-666/Flipkart-GRID-challenge 
```
2. Install Dependencies:
```
$ npm install
```
3. Launch the local development blockchain:
  ```
  $ npx hardhat node
  ```
4. Connect development blockchain accounts to Metamask
- Copy private key of the addresses and import to Metamask
- Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.
- If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the "Network Name" field enter "Hardhat". For the "New RPC URL" field enter "http://127.0.0.1:8545". For the chain ID enter "31337". Then click save.

5. Migrate Smart Contracts:
```
$ npx hardhat run src/backend/scripts/deploy.js --network localhost
```

6. Run the Development server by
```
$ npm run start
```

## Demo:
Video demostration : https://youtu.be/3t715p6pglA (Video Link) 

## Scalability:
- Creating a more fully fledged marketplace that will handle selling and listing 
products as well as the NFTs for them.
- Implementing better sorting and searching facilities in the GUI tool to make it easier to facilities the transactions.
- Add facilities to incorporate extended warranties for products.
