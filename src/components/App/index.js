import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { useSelector } from 'react-redux'
import Navbar from '../Navbar'
import ConnectedAccount from '../ConnectedAccount'
import TokenBalance from '../TokenBalance'
import ETHGraph from '../ETHGraph'
import { getLibrary } from '../../functions'
import Deposit from '../Deposit'
import Withdraw from '../Withdraw'
import { DAITokenAddress, aDAITokenAddress } from '../../utils'

function App() {
  const address = useSelector((state) => state.account.address)
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Navbar />
      {address && (
        <div className="h-screen p-5 bg-blue-secondary">
          <div className="flex flex-col justify-between mb-12 lg:flex-row">
            <ConnectedAccount />
            <TokenBalance address={DAITokenAddress} token="DAI" />
            <TokenBalance address={aDAITokenAddress} token="aDAI" />
          </div>
          <div className="flex flex-col 2xl:flex-row">
            <ETHGraph />
            <div className="flex flex-col justify-between order-1 mx-8 xl:flex-row xl:order-2 2xl:w-1/2">
              <Deposit />
              <Withdraw />
            </div>
          </div>
        </div>
      )}
    </Web3ReactProvider>
  )
}

export default App
