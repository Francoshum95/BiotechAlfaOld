import {NosymbolNoNullPrecentage, dataFormat} from './format/Format';


export default function EarningsTable(props) {
  const {earnings} = props
  const {width} = earnings;

  
  return (
    <div className='mt-3 select-none'>
    
      <table className="w-full">
        <thead className="bg-gray-600 w-full">
          <tr>
            <th className="text-left">(USD)</th>
            {
              width <= 734 && earnings.date&&
              earnings.date.slice(-4).map(yaer => {
                  return(
                    <th>{yaer}</th>
                  )
                })
            }
            {
              width >= 735 && width <= 900 && earnings.date&&
              earnings.date.slice(-13).map(yaer => {
                  return(
                    <th>{yaer}</th>
                  )
                })
            }
            {
              width >= 901 && earnings.date&&
              earnings.date.map(yaer => {
                  return(
                    <th>{yaer}</th>
                  )
                })
            }
          </tr>
        </thead>
        <tbody className="w-full">
          <tr>
            <th className="text-yellow-400 text-left">FY</th>
            {
              width <= 734 && earnings.fy &&
                earnings.fy.slice(-4).map(value => {
                  return (
                    <th className="text-yellow-400">{dataFormat(value.value)}</th>
                  )
                })
            }
            {
              width >= 735 && width <= 900 && earnings.fy &&
                earnings.fy.slice(-13).map(value => {
                  return (
                    <th className="text-yellow-400">{dataFormat(value.value)}</th>
                  )
                })
            }
            {
              width >= 901 && earnings.fy &&
                earnings.fy.map(value => {
                  return (
                    <th className="text-yellow-400">{dataFormat(value.value)}</th>
                  )
                })
            }
  
          </tr>
          <tr>
            <td className="text-yellow-400 text-left">Growth %</td>
            {
              width <= 734 && earnings.fy &&
                earnings.fy.slice(-4).map(value => {
                  return (
                    <th className="text-yellow-400">{NosymbolNoNullPrecentage(value.growth)}</th>
                  )
                })
            }
            {
               width >= 735 && width <= 900 && earnings.fy &&
                earnings.fy.slice(-13).map(value => {
                  return (
                    <th className="text-yellow-400">{NosymbolNoNullPrecentage(value.growth)}</th>
                  )
                })
            }
            {
               width >= 901 && earnings.fy &&
                earnings.fy.map(value => {
                  return (
                    <th className="text-yellow-400">{NosymbolNoNullPrecentage(value.growth)}</th>
                  )
                })
            }
          </tr>
  
        </tbody>
      </table>


    </div>
  )
}
