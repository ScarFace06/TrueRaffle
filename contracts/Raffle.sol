// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Raffle is VRFConsumerBase {

    struct RandomInfos{
        string name;
        string id;
        string ipfs_hash;
        uint256 winner;
        uint256 part_count;
        bytes32 chainlinkRequestID;
    }

    mapping (bytes32 => RandomInfos) public requestIDtoRInfos;
    mapping (uint256 => RandomInfos) public countToRInfos;


    uint256 public counter = 0;
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 internal coin;
    address internal LinkToken;
    IERC20 public TRC;

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
    constructor(address _linkTokenAddress, address _trcAddress)
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            _linkTokenAddress  // LINK Token
        ) public
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        LinkToken = _linkTokenAddress;
        coin = 1*10**18;
        TRC = IERC20(_trcAddress);
    }


    function getWinner(uint256 UserProvidSeed, string memory _id, uint256 participant,string memory _name, string memory _hash) public returns (bytes32){
        require(TRC.allowance(msg.sender, address(this)) >= coin, "insufficient allowance amount");
        TRC.transferFrom(msg.sender, address(this), coin);
        bytes32 requestID = requestRandomness(keyHash,fee,UserProvidSeed);
        requestIDtoRInfos[requestID] = RandomInfos(_name,_id,_hash,(participant+1),participant,requestID);
        emit requestedRaffle(requestID);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        requestIDtoRInfos[requestId].winner = randomness % requestIDtoRInfos[requestId].part_count;
        countToRInfos[counter] = requestIDtoRInfos[requestId];
        counter++;
    }

    function swap(uint256 _amount) public{
      // TODO allownces ;
      require(IERC20(LinkToken).allowance(msg.sender, address(this)) >= (_amount*fee), "insufficient allowance amount");
      IERC20(LinkToken).transferFrom(msg.sender, address(this),(_amount*fee));
      TRC.transfer(msg.sender, (_amount*coin));
    }




}
