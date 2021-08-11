import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { parseUnits } from '@ethersproject/units'
import Button from '../Button'
import Card from '../Card'
import { LendingPoolContractAddress, DAITokenAddress } from '../../utils'
const LendingPoolV2Artifact = require('@aave/protocol-v2/artifacts/contracts/protocol/lendingpool/LendingPool.sol/LendingPool.json')

export default function Withdraw(props) {
  const { library } = useWeb3React()
  const [amount, setAmount] = useState()
  const account = useSelector((state) => state.account)
  const [isDisable, setIsDisable] = useState(true)
  const [status, setStatus] = useState('')

  const lendingPoolContract = new Contract(
    LendingPoolContractAddress,
    LendingPoolV2Artifact.abi,
    library.getSigner()
  )

  const onChangeAmount = (e) => {
    setStatus('')
    setAmount(e.target.value)

    if (parseFloat(e.target.value) < parseFloat(account?.tokens.aDAI)) {
      setIsDisable(false)
    } else setIsDisable(true)
  }
  const withdraw = async () => {
    let tx = await lendingPoolContract.withdraw(
      DAITokenAddress,
      parseUnits(amount),
      account.address
    )
    setStatus('Withdraw pending ...')
    await tx.wait()
    setStatus('Withdraw confirmed ...')
  }
  return (
    <Card
      title="Withdraw DAI from Aave v2"
      className="w-full mb-8 xl:mx-4 xl:w-1/2 2xl:mb-8 2xl:w-full"
    >
      <div className="flex flex-col">
        <input
          type="number"
          onChange={onChangeAmount}
          className="h-12 p-4 border rounded-lg focus:border-pink-primary border-pink-primary bg-blue-primary text-white-100"
        />
        {status && <p className="text-pink-primary">{status}</p>}
        <div className="flex justify-between mt-8">
          <Button
            title="Withdraw"
            className={`mx-3 ${
              isDisable ? 'bg-gray-200' : 'hover:bg-blue-primary'
            }`}
            disabled={isDisable}
            onClick={withdraw}
          />
        </div>
      </div>
    </Card>
  )
}
