import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card'

export default function ConnectedAccount(props) {
  const walletAddress = useSelector((state) => state.account.address)
  return (
    <Card title="Connected Account" className="w-full mb-8 lg:mx-8 lg:w-1/3">
      <p className="w-full overflow-hidden text-2xl text-white-100 overflow-ellipsis">
        {walletAddress}
      </p>
    </Card>
  )
}
