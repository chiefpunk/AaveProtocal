import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { XAxis, YAxis, ResponsiveContainer, Line, LineChart } from 'recharts'
import Card from '../Card'

export default function ETHGraph(props) {
  const [data, setData] = useState([])
  const [fetchingData, setFetchingData] = useState(false)
  useEffect(() => {
    const getData = () => {
      const url =
        'https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=30&aggregate=1&e=Cexio'
      setFetchingData(true)
      fetch(url)
        .then((r) => r.json())
        .then((cryptoprice) => {
          const sortedData = []
          let count = 0

          for (let date in cryptoprice.Data) {
            sortedData.push({
              d: moment(cryptoprice.Data[date].time * 1000).format('MMM DD'),
              p: cryptoprice.Data[date].close.toLocaleString('us-EN', {
                style: 'currency',
                currency: 'USD',
              }),
              x: count,
              y: cryptoprice.Data[date].close,
            })
            count++
          }
          setFetchingData(false)
          setData(sortedData)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    getData()
  }, [])

  return (
    <Card
      title="ETH Price Chart"
      className="order-1 mx-8 mb-12 w-3/3 2xl:w-1/2 2xl:order-2"
    >
      {fetchingData ? (
        <h1>Loading Graph</h1>
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis dataKey="d" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Line type="monotone" dataKey="y" stroke="#00ff00" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
