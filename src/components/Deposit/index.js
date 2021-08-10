import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { parseUnits } from '@ethersproject/units'
import Button from '../Button'
import Card from '../Card'
import LendingPoolABI from '../../abi/LendingPoolABI'
import ERC20ABI from '../../abi/ERC20.abi.json'
import { LendingPoolContractAddress, DAITokenAddress } from '../../utils'

export default function Deposit(props) {
  const { library } = useWeb3React()
  // const address = useSelector((state) => state.account.address)
  const [amount, setAmount] = useState()

  const lendingPoolContract = new Contract(
    LendingPoolContractAddress,
    LendingPoolABI,
    library.getSigner()
  )

  const ERC20Contract = new Contract(
    DAITokenAddress,
    ERC20ABI,
    library.getSigner()
  )

  const approve = async () => {
    await ERC20Contract.approve(
      LendingPoolContractAddress,
      parseFloat(parseUnits(amount, 0))
    )
    ERC20Contract.on('Transfer', (from, to, value, event) => {
      console.log(from, to, value)

      console.log(event.blockNumber)
    })
  }
  const deposit = async () => {
    await lendingPoolContract.deposit(
      DAITokenAddress,
      parseFloat(parseUnits(amount, 0))
    )
  }
  const onChangeAmount = (e) => {
    setAmount(e.target.value)
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
        <div className="flex justify-between mt-8">
          <Button title="Approve" className="mx-3" onClick={approve} />
          <Button title="Deposit" className="mx-3" onClick={deposit} />
        </div>
      </div>
    </Card>
  )
}
