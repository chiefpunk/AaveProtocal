import React from 'react'
import Button from '../Button'
import Card from '../Card'

export default function Withdraw(props) {
  return (
    <Card title="Withdraw DAI from Aave v2">
      <div className="flex flex-col">
        <input
          type="number"
          className="h-12 p-4 border rounded-lg focus:border-pink-primary border-pink-primary bg-blue-primary text-white-100"
        />
        <div className="flex justify-between mt-8">
          <Button title="Withdraw" className="mx-3" />
        </div>
      </div>
    </Card>
  )
}
