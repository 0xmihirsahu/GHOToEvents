'use client'
import { WagmiConfig, createConfig, chain } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { mainnet, polygon, polygonMumbai, hardhat, sepolia } from "wagmi/chains";

const chains = [mainnet, polygon, sepolia, polygonMumbai, hardhat, ];

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID, 
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
    chains,
    appName: "GHOToEvents",
    appDescription: "Events Dapp with GHO and Chainlink",
  }),
);

export default function Web3Provider({children}){
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider customTheme={{
        "--ck-font-family" : '"Pixelify Sans"',
        }} theme="retro" mode="dark">
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
};