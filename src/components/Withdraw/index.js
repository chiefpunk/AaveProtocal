import React, { useState } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { parseUnits } from '@ethersproject/units'
import Button from '../Button'
import Card from '../Card'
import LendingPoolABI from '../../abi/LendingPoolABI'
import { LendingPoolContractAddress, DAITokenAddress } from '../../utils'

export default function Withdraw(props) {
  const { library } = useWeb3React()
  const [amount, setAmount] = useState()

  const lendingPoolContract = new Contract(
    LendingPoolContractAddress,
    LendingPoolABI,
    library.getSigner()
  )

  const onChangeAmount = (e) => {
    setAmount(e.target.value)
  }
  const withdraw = async () => {
    await lendingPoolContract.withdraw(
      DAITokenAddress,
      parseFloat(parseUnits(amount, 0))
    )
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
        <div className="flex justify-between mt-8">
          <Button title="Withdraw" className="mx-3" onClick={withdraw} />
        </div>
      </div>
    </Card>
  )
}
