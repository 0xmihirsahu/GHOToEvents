// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/GhoEvents.sol";
import {IERC20} from "aave-v3-core/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import {IPool} from "aave-v3-core/contracts/interfaces/IPool.sol";
import {GhoToken} from "gho-core/src/contracts/gho/GhoToken.sol";
import {IGhoToken} from "gho-core/src/contracts/gho/interfaces/IGhoToken.sol";

contract GhoEventsTest is Test {
    GhoEvents private ghoEvents;
    GhoToken private ghoToken;
    IPool private aavePool;
    address private organizer = address(0x1);
    address private attendee = address(0x2);

    // Addresses for GHO token and Aave pool on Sepolia
    address private constant GHO_TOKEN_ADDRESS =
        0xc4bF5CbDaBE595361438F8c6a187bDc330539c60; // GHO token address
    address private constant AAVE_POOL_ADDRESS =
        0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951; // Aave pool address

    function setUp() public {
        vm.createSelectFork(vm.rpcUrl("sepolia"));
        ghoToken = GhoToken(GHO_TOKEN_ADDRESS);
        aavePool = IPool(AAVE_POOL_ADDRESS);
        ghoEvents = new GhoEvents(GHO_TOKEN_ADDRESS, AAVE_POOL_ADDRESS);

        // Set up the initial state
        // Provide liquidity to Aave pool
        // Set facilitator in the GHO token contract
    }

    function testCreateEvent() public {
        uint256 eventTimestamp = block.timestamp + 1 days;
        uint256 eventPrice = 1; // 10 GHO for testing
        uint256 maxCapacity = 100;

        vm.startPrank(organizer);
        ghoEvents.createEvent(eventTimestamp, eventPrice, maxCapacity);
        vm.stopPrank();

        // Get the event details
        bytes32 eventId = keccak256(
            abi.encodePacked(
                organizer,
                address(ghoEvents),
                eventTimestamp,
                eventPrice,
                maxCapacity
            )
        );
        (bytes32 returnedEventId, , , , , , ) = ghoEvents.getEvent(eventId);

        // Assertions
        assertEq(returnedEventId, eventId, "Event ID should match");
    }

    function testRSVPWithGho() public {
        uint256 eventTimestamp = block.timestamp + 1 days;
        uint256 eventPrice = 10; // 10 GHO for testing
        uint256 maxCapacity = 100;
        bytes32 eventId = createTestEvent(
            eventTimestamp,
            eventPrice,
            maxCapacity
        );

        // Attendee gets some GHO tokens (simulate borrowing from Aave or receiving from another source)
        // ...

        vm.startPrank(attendee);
        ghoToken.approve(address(ghoEvents), eventPrice);
        ghoEvents.rsvpWithGho(eventId);
        vm.stopPrank();

        // Assertions
        assertEq(
            ghoToken.balanceOf(attendee),
            0,
            "GHO tokens should be transferred to the contract"
        );
    }

    // Helper function to create a test event
    function createTestEvent(
        uint256 eventTimestamp,
        uint256 eventPrice,
        uint256 maxCapacity
    ) internal returns (bytes32) {
        vm.startPrank(organizer);
        ghoEvents.createEvent(eventTimestamp, eventPrice, maxCapacity);
        vm.stopPrank();
        return
            keccak256(
                abi.encodePacked(
                    organizer,
                    address(ghoEvents),
                    eventTimestamp,
                    eventPrice,
                    maxCapacity
                )
            );
    }
}
