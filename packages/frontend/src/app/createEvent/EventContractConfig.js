// EventContractConfig.js
export const eventContractAddress = "0x5b97753C32aeDD0F6e9899AA8E04F8Fe92c64c2B";

export const eventContractAbi = [
    [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_date",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_maxCapacity",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_location",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_websiteLink",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_collateralAmount",
                    "type": "uint256"
                }
            ],
            "name": "createEvent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "eventId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "eventOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "maxCapacity",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "websiteLink",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "collateralAmount",
                    "type": "uint256"
                }
            ],
            "name": "EventCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "events",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "eventId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "eventOwner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "maxCapacity",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "websiteLink",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "collateralAmount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_eventId",
                    "type": "uint256"
                }
            ],
            "name": "getConfirmedRSVPs",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_eventId",
                    "type": "uint256"
                }
            ],
            "name": "getEvent",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "eventId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "eventOwner",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "maxCapacity",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "location",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "websiteLink",
                            "type": "string"
                        },
                        {
                            "internalType": "address[]",
                            "name": "confirmedRSVPs",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "collateralAmount",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct EventContract.Event",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextEventId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];
const EventContractConfig = {
    eventContractAddress,
    eventContractAbi,
  };  

  export default EventContractConfig;
