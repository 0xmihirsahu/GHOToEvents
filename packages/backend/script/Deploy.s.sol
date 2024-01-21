// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/GhoEvents.sol";

contract DeployToLocal is Script {
    function run() external {
        vm.startBroadcast();

        address ghoTokenAddress = vm.envAddress("GHO_TOKEN_ADDRESS");
        address poolAddress = vm.envAddress("POOL_ADDRESS");

        GhoEvents ghoEvents = new GhoEvents(ghoTokenAddress, poolAddress);
        console.log("GhoEvents deployed at:", address(ghoEvents));

        vm.stopBroadcast();
    }
}
