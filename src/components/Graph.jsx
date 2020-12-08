import React from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

export const Graph = ({data, widthBox}) => {
  return (
    <LineChart 
      width={widthBox * 5 / 6}
      height={widthBox / 2}
      data={data}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" label={{ value: "Дата", position: "insideBottom" }} domain={['dataMin', 'dataMax']} />
      <YAxis label={{ value: data && data[0].measure, angle: -90, position: 'insideLeft' }} domain={['dataMin', 'dataMax']} />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="value" stroke="#ff7300" />
    </LineChart>
  )
}