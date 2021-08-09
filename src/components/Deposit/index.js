import React, { useState } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import Button from '../Button'
import Card from '../Card'
import LendingPoolABI from '../../abi/LendingPoolABI.json'
import { LendingPoolContractAddress, DAITokenAddress } from '../../utils'

export default function Deposit(props) {
  const { library, account } = useWeb3React()
  const [amount, setAmount] = useState()
  const lendingPoolContract = new Contract(
    LendingPoolContractAddress,
    LendingPoolABI,
    library.getSigner()
  )

  const approve = async () => {
    await lendingPoolContract.allowance(amount)
  }
  const deposit = async () => {
    await lendingPoolContract.deposit(DAITokenAddress, account, amount)
  }
  const onChangeAmount = (e) => {
    setAmount(e.target.value)
  }
  return (
    <Card title="Deposit DAI into Aave v2" className="mb-4">
      <div className="flex flex-col">
        <input
          type="number"
          className="h-12 p-4 border rounded-lg focus:border-pink-primary border-pink-primary bg-blue-primary text-white-100"
          onChange={onChangeAmount}
        />
        <div className="flex justify-between mt-8">
          <Button title="Approve" className="mx-3" onClick={approve} />
          <Button title="Deposit" className="mx-3" onClick={deposit} />
        </div>
      </div>
    </Card>
  )
}
