import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import {
  updateWalletAddress,
  disconnectWallet,
} from '../../store/account/accountSlice'
import { injectedConnector } from '../../connectors'
import metamaskIcon from '../../assets/metamask-fox.svg'
import Button from '../Button'

export default function Navbar(props) {
  const { chainId, account, activate, deactivate } = useWeb3React()
  const dispatch = useDispatch()

  const walletAddress = useSelector((state) => state.account.address)

  console.log({ account, chainId })

  useEffect(() => {
    if (chainId && chainId !== 42) {
      alert('We only use the Kovan Test Network')
      deactivate()
    } else {
      dispatch(updateWalletAddress(account))
    }
  }, [account, chainId, deactivate, dispatch])

  const onConnectMetaMask = () => {
    activate(injectedConnector)
  }

  const onDisConnectMetaMask = () => {
    dispatch(disconnectWallet)
    deactivate()
  }

  return (
    <div className="flex justify-end px-8 py-4 bg-blue-primary">
      {walletAddress === undefined ? (
        <Button
          title="Connect Wallet"
          icon={metamaskIcon}
          onClick={onConnectMetaMask}
        />
      ) : (
        <Button
          title="Disconnect Wallet"
          icon={metamaskIcon}
          onClick={onDisConnectMetaMask}
        />
      )}
    </div>
  )
}
