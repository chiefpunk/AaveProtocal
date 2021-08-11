import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { parseUnits } from '@ethersproject/units'
import Button from '../Button'
import Card from '../Card'
import ERC20ABI from '../../abi/ERC20.abi.json'
import { LendingPoolContractAddress, DAITokenAddress } from '../../utils'
const LendingPoolV2Artifact = require('@aave/protocol-v2/artifacts/contracts/protocol/lendingpool/LendingPool.sol/LendingPool.json')

export default function Deposit(props) {
  const { library } = useWeb3React()
  const account = useSelector((state) => state.account)
  const [isDisable, setIsDisable] = useState(true)
  const [isApprove, setIsApprove] = useState(false)
  const [status, setStatus] = useState('')
  const [amount, setAmount] = useState()

  const lendingPoolContract = new Contract(
    LendingPoolContractAddress,
    LendingPoolV2Artifact.abi,
    library.getSigner()
  )

  const ERC20Contract = new Contract(
    DAITokenAddress,
    ERC20ABI,
    library.getSigner()
  )

  const approve = async () => {
    let tx = await ERC20Contract.approve(
      LendingPoolContractAddress,
      parseUnits(amount)
    )
    setStatus('Approve Transaction Pending ....')
    await tx.wait()
    setStatus('Approve Transaction Approved ....')
    setIsApprove(true)
  }
  const deposit = async () => {
    let tx = await lendingPoolContract.deposit(
      DAITokenAddress, // DAI token address
      parseUnits(amount), // amount
      account?.address, // my eth address
      '0'
    )
    setStatus('Deposit Transaction Pending ...')
    await tx.wait()
    setStatus('Deposit Transaction Confirmed ...')
  }
  const onChangeAmount = (e) => {
    setStatus('')
    setAmount(e.target.value)

    if (parseFloat(e.target.value) < parseFloat(account?.tokens.DAI)) {
      setIsDisable(false)
    } else setIsDisable(true)
  }
  return (
    <Card
      title="Deposit DAI into Aave v2"
      className="w-full mb-8 xl:mx-4 xl:w-1/2 2xl:mb-8 2xl:w-full"
    >
      <div className="flex flex-col">
        <input
          type="number"
          className="h-12 p-4 border rounded-lg focus:border-pink-primary border-pink-primary bg-blue-primary text-white-100"
          onChange={onChangeAmount}
        />
        {status && <p className="text-pink-primary">{status}</p>}
        <div className="flex justify-between mt-8">
          <Button
            title="Approve"
            className={`mx-3 ${
              isDisable ? 'bg-gray-200' : 'hover:bg-blue-primary'
            }`}
            disabled={isDisable}
            onClick={approve}
          />
          <Button
            title="Deposit"
            className={`mx-3 ${
              !isApprove ? 'bg-gray-200' : 'hover:bg-blue-primary'
            }`}
            disabled={!isApprove}
            onClick={deposit}
          />
        </div>
      </div>
    </Card>
  )
}
