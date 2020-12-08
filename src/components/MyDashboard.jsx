import React, { useState, useEffect, useRef } from 'react'
import { ApiClient } from 'admin-bro'
import { Box, Button, Link, Icon, Text, DropDown, DropDownTrigger, DropDownMenu, DropDownItem } from '@admin-bro/design-system'
import { Graph } from './Graph'

const api = new ApiClient()
const units = [
  { name: "Температура", value: "temperature", measure: "° C" },
  { name: "Давление", value: "pressure", measure: "мм рт. ст."  },
  { name: "Влажность", value: "humidity", measure: "%"  },
  { name: "Ветер", value: "wind", measure: "м / с"  },
]


const Dashboard = () => {
  const [data, setData] = useState(null)
  const [unit, setUnit] = useState(units[0])
  const graphRef = useRef(null)

  useEffect(() => {
    let mounted = true
    if(mounted) {
      api.getDashboard().then((response) => {
          setData(response.data)
      })
    }
    return () => mounted = false
  }, [])

  const graphHandler = (data) => {
    if(data) {
      return (
        data.map( (item) => {
          return { date: item.date, value: item[unit.value], measure: unit.measure }
        })
      )
    }
  }

  const dropDownItemHandler = (i) => {
    setUnit(units[i])
  }

  return (
    <Box>
      <Box
        m="1rem"
        flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="h1" >
          {unit.name}
        </Text>
        <DropDown>
          <DropDownTrigger>
            <Button variant="primary" >
              <Icon icon="OverflowMenuHorizontal" />
              Выберите показатель
            </Button>
          </DropDownTrigger>
          <DropDownMenu width={1} >
            { units.map( (item, i) => {
              return (
                <DropDownItem key={i+item.name} onClick={() => dropDownItemHandler(i) } >
                  {item.name}
                </DropDownItem>
              )
            }) }
          </DropDownMenu>
        </DropDown>
      </Box>
      <hr/>
  
      <Box m="3rem" ref={graphRef} >
        <Graph
          data={ graphHandler(data) }
          widthBox={graphRef.current && parseFloat(getComputedStyle(graphRef.current).width)}
        />
      </Box>
      <hr/>
  
      <Box mt="2rem" flex justifyContent="center" >
        <Link href="/admin/resources/Weather" >
          <Button onClick={() => {}} >
            Редактировать
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Dashboard