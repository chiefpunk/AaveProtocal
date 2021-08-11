import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import useSWR from 'swr'
import Card from '../Card'
import { fetcher } from '../../functions'
import {
  updateADAITokenBalance,
  updateDAITokenBalance,
} from '../../store/account/accountSlice'
import ERC20ABI from '../../abi/ERC20.abi.json'

export default function TokenBalance(props) {
  const walletAddress = useSelector((state) => state.account.address)
  const dispatch = useDispatch()
  const { library } = useWeb3React()
  const { data: balance, mutate } = useSWR(
    [props.address, 'balanceOf', walletAddress],
    {
      fetcher: fetcher(library, ERC20ABI),
    }
  )

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`)
    const contract = new Contract(props.address, ERC20ABI, library.getSigner())
    const fromMe = contract.filters.Transfer(walletAddress, null)
    library.on(fromMe, (from, to, amount, event) => {
      console.log('Transfer|sent', { from, to, amount, event })
      mutate(undefined, true)
    })
    const toMe = contract.filters.Transfer(null, walletAddress)
    library.on(toMe, (from, to, amount, event) => {
      console.log('Transfer|received', { from, to, amount, event })
      mutate(undefined, true)
    })
    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners(toMe)
      library.removeAllListeners(fromMe)
    }
    // trigger the effect only on component mount
  }, [library, mutate, props.address, walletAddress])

  useEffect(() => {
    if (balance) {
      if (props.token === 'DAI')
        dispatch(
          updateDAITokenBalance(
            parseFloat(formatEther(balance, 18)).toPrecision(4)
          )
        )
      else
        dispatch(
          updateADAITokenBalance(
            parseFloat(formatEther(balance, 18)).toPrecision(4)
          )
        )
    }
  }, [balance, props.token, dispatch])

  if (!balance) {
    return <Card title={props.title} className="w-1/3 mx-8" />
  }

  return (
    <Card
      title={`${props.token} Balance`}
      className="w-full mb-8 lg:mx-8 lg:w-1/3"
    >
      <p className="w-full overflow-hidden text-2xl text-white-100 overflow-ellipsis">
        {parseFloat(formatEther(balance, 18)).toPrecision(4)} {props.token}
      </p>
    </Card>
  )
}
