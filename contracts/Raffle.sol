// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract Raffle is VRFConsumerBase {

    struct RandomInfos{
        string id;
        uint256 winner;
        uint256 part_count;

    }

    mapping (bytes32 => RandomInfos) public requestIDtoRInfos;
    mapping (uint256 => RandomInfos) public countToRInfos;


    uint256 public counter = 0;
    bytes32 internal keyHash;
    uint256 internal fee;

    uint256 public randomResult;
    event requestedRaffle( bytes32 indexed requestID);
    event gotWinner(bytes32 indexed requestID);

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor(address _linkTokenAddress)
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            _linkTokenAddress  // LINK Token
        ) public
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }


    function getWinner(uint256 UserProvidSeed, string memory _id, uint256 participant) public returns (bytes32){
        bytes32 requestID = requestRandomness(keyHash,fee,UserProvidSeed);
        requestIDtoRInfos[requestID] = RandomInfos(_id,0,participant);
        emit requestedRaffle(requestID);
    }


    function gotWinnerEmitter( bytes32 requestID) internal returns (bytes32){
        emit gotWinner(requestID);
    }


    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        requestIDtoRInfos[requestId].winner = randomness % requestIDtoRInfos[requestId].part_count;
        countToRInfos[counter] = requestIDtoRInfos[requestId];
        counter++;
        gotWinnerEmitter(requestId);
    }




}
