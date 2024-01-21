// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "aave-v3-core/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import {IPool} from "aave-v3-core/contracts/interfaces/IPool.sol";

/**
 * @title GhoEvents
 * @author Hebx
 * @notice This contract allows users to create events and RSVP with GHO tokens
 * @dev [WIP] This contract is a work in progress
 */

contract GhoEvents {
    IERC20 public ghoToken;
    IPool public aavePool;

    struct Event {
        bytes32 id;
        address organizer;
        uint256 timestamp;
        uint256 price; // Price in GHO tokens
        uint256 maxCapacity;
        bool isPaidOut;
        address[] attendees;
    }

    mapping(bytes32 => Event) public events;

    event EventCreated(
        bytes32 id,
        address organizer,
        uint256 timestamp,
        uint256 price,
        uint256 maxCapacity
    );
    event RSVP(bytes32 eventId, address attendee);
    event AttendeeConfirmed(bytes32 eventId, address attendee);
    event DepositsPaidOut(bytes32 eventId);

    constructor(address _ghoTokenAddress, address _aavePoolAddress) {
        ghoToken = IERC20(_ghoTokenAddress);
        aavePool = IPool(_aavePoolAddress);
    }

    function createEvent(
        uint256 timestamp,
        uint256 price,
        uint256 maxCapacity
    ) external {
        bytes32 eventId = keccak256(
            abi.encodePacked(
                msg.sender,
                address(this),
                timestamp,
                price,
                maxCapacity
            )
        );
        address[] memory emptyArray;

        events[eventId] = Event({
            id: eventId,
            organizer: msg.sender,
            timestamp: timestamp,
            price: price,
            maxCapacity: maxCapacity,
            isPaidOut: false,
            attendees: emptyArray
        });

        emit EventCreated(eventId, msg.sender, timestamp, price, maxCapacity);
    }

    function rsvpWithGho(bytes32 eventId) external {
        Event storage myEvent = events[eventId];
        require(
            block.timestamp <= myEvent.timestamp,
            "Event has already occurred"
        );
        require(
            myEvent.attendees.length < myEvent.maxCapacity,
            "Event is at full capacity"
        );
        require(
            ghoToken.transferFrom(msg.sender, address(this), myEvent.price),
            "Failed to transfer GHO tokens"
        );

        myEvent.attendees.push(msg.sender);
        emit RSVP(eventId, msg.sender);
    }

    function depositCollateralAndBorrowGho(
        bytes32 eventId,
        address collateralAsset,
        uint256 collateralAmount,
        uint256 borrowAmount
    ) external {
        Event storage myEvent = events[eventId];
        require(
            block.timestamp <= myEvent.timestamp,
            "Event has already occurred"
        );
        require(
            myEvent.attendees.length < myEvent.maxCapacity,
            "Event is at full capacity"
        );

        IERC20(collateralAsset).transferFrom(
            msg.sender,
            address(this),
            collateralAmount
        );
        IERC20(collateralAsset).approve(address(aavePool), collateralAmount);
        aavePool.supply(collateralAsset, collateralAmount, address(this), 0);

        aavePool.borrow(address(ghoToken), borrowAmount, 2, 0, address(this)); // 2 for variable interest rate mode
        require(
            ghoToken.transfer(msg.sender, borrowAmount),
            "Failed to transfer borrowed GHO tokens"
        );

        rsvpWithGho(eventId); // RSVP with the borrowed GHO tokens
    }

    function confirmAttendee(bytes32 eventId, address attendee) external {
        Event storage myEvent = events[eventId];
        require(
            msg.sender == myEvent.organizer,
            "Only the organizer can confirm attendees"
        );
        require(
            ghoToken.transfer(attendee, myEvent.price),
            "Failed to refund GHO token deposit"
        );

        emit AttendeeConfirmed(eventId, attendee);
    }

    function withdrawUnclaimedDeposits(bytes32 eventId) external {
        Event storage myEvent = events[eventId];
        require(
            msg.sender == myEvent.organizer,
            "Only the organizer can withdraw deposits"
        );
        require(!myEvent.isPaidOut, "Deposits already paid out");
        require(
            block.timestamp > (myEvent.timestamp + 7 days),
            "Too early to withdraw deposits"
        );

        uint256 unclaimed = myEvent.maxCapacity - myEvent.attendees.length;
        uint256 payout = unclaimed * myEvent.price;
        require(
            ghoToken.transfer(msg.sender, payout),
            "Failed to send unclaimed GHO tokens"
        );

        myEvent.isPaidOut = true;
        emit DepositsPaidOut(eventId);
    }

    function getEvent(
        bytes32 eventId
    )
        external
        view
        returns (
            bytes32 id,
            address organizer,
            uint256 timestamp,
            uint256 price,
            uint256 maxCapacity,
            bool isPaidOut,
            address[] memory attendees
        )
    {
        Event storage myEvent = events[eventId];
        return (
            myEvent.id,
            myEvent.organizer,
            myEvent.timestamp,
            myEvent.price,
            myEvent.maxCapacity,
            myEvent.isPaidOut,
            myEvent.attendees
        );
    }
}
