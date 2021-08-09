import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card'

export default function ConnectedAccount(props) {
  const walletAddress = useSelector((state) => state.account.address)
  return (
    <Card title="Connected Account" className="w-1/3 mx-8">
      <p className="w-full overflow-hidden text-2xl text-white-100 overflow-ellipsis">
        {walletAddress}
      </p>
    </Card>
  )
}
