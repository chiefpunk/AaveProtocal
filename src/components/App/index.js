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
          <div className="flex justify-between mb-12">
            <ConnectedAccount />
            <TokenBalance address={DAITokenAddress} title="DAI Balance" />
            <TokenBalance address={aDAITokenAddress} title="aDAI Balance" />
          </div>
          <div className="flex">
            <ETHGraph />
            <div className="w-1/3 mx-8">
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
