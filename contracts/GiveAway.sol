// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;


import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract RaffleGiveAway is VRFConsumerBase{

    struct GiveAway{

        string name;
        address owner;
        uint256 amount;
        address currency;
        bytes32 cl_request_id;
        address[] participants;
        uint256 winner;
        string ipfs_hash;
        bool on_going;
        uint256 id;
        uint256 seed;

    }

    mapping (bytes32 => GiveAway) public requestIDtoGiveAway;
    mapping (uint256 => GiveAway) public countToGiveAway;

    uint256 public count = 0;
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 internal coin;
    address internal LinkToken;
    IERC20 public TRC;



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

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        requestIDtoGiveAway[requestId].winner = randomness % requestIDtoGiveAway[requestId].participants.length;
        IERC20(requestIDtoGiveAway[requestId].currency).transfer(msg.sender, requestIDtoGiveAway[requestId].amount);
        requestIDtoGiveAway[requestId].on_going = false;
        countToGiveAway[requestIDtoGiveAway[requestId].id] = requestIDtoGiveAway[requestId];

        // todo events
    }


    function createGiveAway (string memory _name, uint256 _amount, address _currency, string memory _ipfs_hash, uint256 _seed) public {
        require(IERC20(_currency).allowance(msg.sender, address(this)) >= (_amount), "insufficient allowance amount");
        IERC20(_currency).transferFrom(msg.sender, address(this),(_amount));
        
        address[] storage temp;
        countToGiveAway[count] = GiveAway(_name, msg.sender,_amount, _currency, "", temp, 0,_ipfs_hash, true,count,_seed);
        count++;
        //todo events

    }


    function takePart(uint256 _id) public {
        require(_id < count, " no such giveaway");
        require(countToGiveAway[_id].on_going, "giveaway already resolved");

        countToGiveAway[_id].participants.push(msg.sender);
        //todo events
        
    }

    function resolveGiveAway(uint256 _id) public {
        require(IERC20(LinkToken).allowance(msg.sender, address(this)) >= (fee), "insufficient allowance amount");
        IERC20(LinkToken).transferFrom(msg.sender, address(this),(fee));
        require(_id < count, " no such giveaway");
        require(countToGiveAway[_id].on_going, "giveaway already resolved");
        require(countToGiveAway[_id].owner == msg.sender, "not your giveaway boiiii");

        bytes32 requestID = requestRandomness(keyHash,fee,countToGiveAway[_id].seed);
        countToGiveAway[_id].cl_request_id = requestID;
        requestIDtoGiveAway[requestID] = countToGiveAway[_id];
        //todo events

    }

    function getGiveAwayPartSize(uint256 _id) public view returns(uint256){
        require(_id < count, " no such giveaway");
        return countToGiveAway[_id].participants.length;

    }

    function getGiveAwayPart(uint256 _id, uint256 _pos) public view returns(address){
        require(_id < count, " no such giveaway");
        require(_pos <countToGiveAway[_id].participants.length, "No such participant");
        return countToGiveAway[_id].participants[_pos];

    }




} 
