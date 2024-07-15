// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPriceFeed {
    function requestNewReport(uint256 taskType) external;
    function latestRoundData() external view returns (uint256 price, uint256 timestamp);
}

contract PredictionMarket {
    struct Market {
        string question;
        uint256 dataType;
        uint256 targetPrice;
        uint256 predictionTime;
        bool isResolved;
        bool outcome;
        uint256 totalYesBets;
        uint256 totalNoBets;
        mapping(address => uint256) yesBets;
        mapping(address => uint256) noBets;
    }

    Market[] public markets;
    IPriceFeed public priceFeed;
    address public owner;
    uint256 public platformFee;

    event MarketCreated(uint256 marketId, string question, uint256 dataType, uint256 targetPrice, uint256 predictionTime);
    event BetPlaced(uint256 marketId, bool prediction, address bettor, uint256 amount);
    event MarketResolved(uint256 marketId, bool outcome);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        priceFeed = IPriceFeed(0xB233eE56e57f7eB1B1144b28214Abc74b273d3D5);
        owner = msg.sender;
        platformFee = 5;
    }

    function createMarket(string memory question, uint256 dataType, uint256 targetPrice, uint256 predictionTime) public onlyOwner {
        require(predictionTime > block.timestamp, "Prediction time must be in the future");

        Market storage newMarket = markets.push();
        newMarket.question = question;
        newMarket.dataType = dataType;
        newMarket.targetPrice = targetPrice;
        newMarket.predictionTime = predictionTime;
        newMarket.isResolved = false;

        emit MarketCreated(markets.length - 1, question, dataType, targetPrice, predictionTime);
    }

    function placeBet(uint256 marketId, bool prediction) public payable {
        require(marketId < markets.length, "Market does not exist");
        require(!markets[marketId].isResolved, "Market already resolved");
        require(msg.value > 0, "Bet amount must be greater than zero");

        if (prediction) {
            markets[marketId].yesBets[msg.sender] += msg.value;
            markets[marketId].totalYesBets += msg.value;
        } else {
            markets[marketId].noBets[msg.sender] += msg.value;
            markets[marketId].totalNoBets += msg.value;
        }

        emit BetPlaced(marketId, prediction, msg.sender, msg.value);
    }

    function resolveMarket(uint256 marketId) public onlyOwner {
        require(marketId < markets.length, "Market does not exist");
        require(block.timestamp >= markets[marketId].predictionTime, "Prediction time not reached");
        require(!markets[marketId].isResolved, "Market already resolved");

        priceFeed.requestNewReport(markets[marketId].dataType);
        (uint256 latestPrice, ) = priceFeed.latestRoundData();

        bool outcome = latestPrice >= markets[marketId].targetPrice;
        markets[marketId].isResolved = true;
        markets[marketId].outcome = outcome;

        emit MarketResolved(marketId, outcome);
    }

    function claimWinnings(uint256 marketId) public {
        require(marketId < markets.length, "Market does not exist");
        require(markets[marketId].isResolved, "Market not resolved yet");

        Market storage market = markets[marketId];
        uint256 userBet;
        uint256 totalWinningBets;
        if (market.outcome) {
            userBet = market.yesBets[msg.sender];
            totalWinningBets = market.totalYesBets;
        } else {
            userBet = market.noBets[msg.sender];
            totalWinningBets = market.totalNoBets;
        }
        require(userBet > 0, "No winnings to claim");

        uint256 winnings = (address(this).balance * userBet) / totalWinningBets;
        uint256 fee = (winnings * platformFee) / 100;
        uint256 payout = winnings - fee;

        if (market.outcome) {
            market.yesBets[msg.sender] = 0;
        } else {
            market.noBets[msg.sender] = 0;
        }

        payable(msg.sender).transfer(payout);
    }

    function getMarket(uint256 marketId) public view returns (
        string memory question,
        uint256 dataType,
        uint256 targetPrice,
        uint256 predictionTime,
        bool isResolved,
        bool outcome,
        uint256 totalYesBets,
        uint256 totalNoBets
    ) {
        require(marketId < markets.length, "Market does not exist");

        Market storage market = markets[marketId];
        return (
            market.question,
            market.dataType,
            market.targetPrice,
            market.predictionTime,
            market.isResolved,
            market.outcome,
            market.totalYesBets,
            market.totalNoBets
        );
    }

    function withdrawFees() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
