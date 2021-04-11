# TrueRaffle

<img src="Logo.png" alt="Logo" width="300"/>

### The Idea
A dapp which uses Chanlink VRF to make cryptographically secure random raffles making them trustless.
The goal is to use it with comments from Social Media (e.g. Youtube, Instagram) or just participation with Metamask.
The winner is saved on chain and verifiable by the Smartcontract.

## Inspiration

Did you ever question the outcome of raffles? I mean in most cases you dont even know how the Winner of a Raffle was determined. In a worst case scenario, the creator of the Raffle could choose the person, he wants to win and you would never know if the Raffle was held fair or unfair. To prevent this, we came up with the idea of a trustless raffle.

## What it does

It can create raffles on youtube comments by using the Chainlink VRF to generate a random winner. You can enter a name for the raffle, youtube link, a seed, and optional a keyword to filter on. After starting the raffle and paying the cost of 1 TrueRaffleCoin which represents 0.1 Chainlink, a winner is chosen by the Chainlink VRF and displayed.


## How to get it working
1. clone repository
2. run npm intstall in main directory
3. (optional) if you want to launch the smartcontracts yourself create an .env File matching the .env.example and migrate them to kovan
4. go into the app directory
5. run npm install
6. if you want to make request to Youtube you need to get an Youtube Api key and create an .env File in app matching it´s .env.example
7. run npm start

Note : Your Metamask should be connected to the kovan testnet going to localhost:Port/Testing you can make an Raffle with presaved comments without needing the Youtube Api key


## How we built it

We used Truffle to write, compile and migrate the smart contracts and hosted them with Infura.
The smart contracts were written in Solidity and we used the Chainlink Vrf coordinator and openzeppelin-contracts ER20 and IERC20 to get it all working.
For the Front-end we used React, React-Routes and build the Components with Ant Design. 
Animated the Components with react-spring and done styling with CSS.
 Truffle, Drizzle, ipfs and web3 were used for the Contract interaction. 

Functionality of this project:
![link](https://raw.githubusercontent.com/ScarFace06/TrueRaffle/main/Images/rafflerequest.png)
First the user provides the necessary input (name, seed, link to video, filter word) to the website. True Raffle then send a request to the YouTube Api and gets all the comments. True Raffle processes them into a Json file. This File is then saved on an ipfs-node (we used infura-ipfs). Ipfs returns a hash to get to the saved Json. All this information is then sent to the Raffle smart contract where it is saved. The Raffle smart contract then request a random number. After getting the random number which determines the index of the winner.

![Raffle Winner](https://raw.githubusercontent.com/ScarFace06/TrueRaffle/main/Images/raffleresult.png)
To display all the information to the user. True raffles send a call to the Raffle smart contract getting the id, name, winner index, participation count and the ipfs hash. It then uses the hash to get the metadata from ipfs and stich both information together to display the outcome of the raffle.

![CoinCircle](https://raw.githubusercontent.com/ScarFace06/TrueRaffle/main/Images/Coinsupply.png)

When created the the Raffle Smart contract gets the total supply of the TrueRaffleCoin. Those can be swapped trough our website by paying 0.1 Link per TRC. This ensures that the Raffle contract has enough link to request a random number. Now to make a Raffle the User must pay a TRC giving it back to the smart contract where it can again be swapped.


## Challenges we ran into

The blockchain is still a new environment for us especially when it comes to programming. That is why we had to spend time on learning the new technologies and frameworks first. Besides that we got in contact with a variety of new libraries and therefore with new documentation. It was not always straight forward but we kept on going and figured it out in the end.

## Accomplishments that we're proud of

We created a product which is very easy to use and has a high potential for mass adoption in future. Therefore it could be a entry point to the blockchain for some people. The raffle and the blockchain are interacting with with real world data and we are proud to be able to solve a real world problem, nearly everyone encountered with.

## What we learned

Due to working with new technologies we got a more deeply understanding of the blockchain. In the process of coding and reading documentation we gained new experience when it comes to working with React, Solidity, Truffle, smart contracts, API's and Design but we also improved our communication skills in the team. Thanks to Patrick and the Chainlink Team for uploading great tutorials frequently during the hackathon. Watching them helped a lot and was very fun. Especially the code alongs.


## What's next for TrueRaffle

There are a lot of ideas and improvements to be made in future. 
We want to implement more platforms like twitter, reddit, telegram and discord. A participation just by logging in with Metamask should also be possible. 
The next idea is to ensure that everyone can read and understand, how a raffle was generated and safed on the blockchain and how the winner was chosen. This would be essential for mass adoption because not everyone can read and understand smart contracts and transactions on the blockchain.
Visualizations and understandable instructions for example.

## Some Screenshots of the website
<img src="Images/youtuberaffle.png" alt="Youtube Raffle" width="1000"/>
<img src="Images/allwinners.png" alt="Youtube Raffle" width="1000"/>
<img src="Images/rafflecoins.png" alt="Youtube Raffle" width="1000"/>
