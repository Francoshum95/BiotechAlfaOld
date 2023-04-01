import LineChart from "./LineChart"
import {NosymbolPrecentage, RatioFor} from '../components/format/Format'
import Restricted from './Restricted'; 

export default function OutlookCard(props) {
  const {stockdata} = props;

  const {fdata} = stockdata;
  const {width} = stockdata;

  const pechartData = {
    labels: fdata.pechart.date,
    datasets: [
      {
        label: 'P/E',
        data: fdata.pechart.value,
        fill: false,
        borderWidth: 2, 
        backgroundColor: '#fb8b1e',
        borderColor: '#fb8b1e',
      },
      {
        label: 'Avg',
        data: fdata.pechart.mean,
        fill: false,
        borderWidth: 2, 
        borderColor: '#767170',
        borderDash: [5, 5]
      },
      {
        label: '+1SD',
        data: fdata.pechart.sdplusone,
        fill: false,
        borderWidth: 1, 
        borderColor: '#767170',
        borderDash: [5, 5]
      },
      {
        label: '+2SD',
        data: fdata.pechart.sdplustwo,
        fill: false,
        borderWidth: 1, 
        borderColor: '#767170',
        borderDash: [5, 5]
      },
      {
        label: '-1SD',
        data: fdata.pechart.sdminone,
        fill: false,
        borderWidth: 1, 
        borderColor: '#767170',
        borderDash: [5, 5]
      },
      {
        label: '-2SD',
        data: fdata.pechart.sdmintwo,
        fill: false,
        borderWidth: 1, 
        borderColor: '#767170',
        borderDash: [5, 5]
      },

    ],
  };

  const pschartData = {
    labels: fdata.pschart.date,
    datasets: [
      {
        label: 'P/S',
        data: fdata.pschart.value,
        fill: false,
        borderWidth: 2, 
        backgroundColor: '#fb8b1e',
        borderColor: '#fb8b1e',
      },
      {
        label: 'Avg',
        data: fdata.pschart.mean,
        fill: false,
        borderWidth: 2, 
        borderColor: '#767170',
        borderDash: [5, 5]
      },
      {
        label: '+1SD',
        data: fdata.pschart.sdplusone,
        fill: false,
        borderWidth: 1, 
        borderColor: '#767170',
        borderDash: [5, 5]
      },
      {
        label: '+2SD',
        data: fdata.pschart.sdplustwo,
        fill: false,
        borderWidth: 1, 
        borderColor: '#767170',
        borderDash: [5, 5]
      },
      {
        label: '-1SD',
        data: fdata.pschart.sdminone,
        fill: false,
        borderWidth: 1, 
        borderColor: '#767170',
        borderDash: [5, 5]
      },
      {
        label: '-2SD',
        data: fdata.pschart.sdmintwo,
        fill: false,
        borderWidth: 1, 
        borderColor: '#767170',
        borderDash: [5, 5]
      },

    ],
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row font-Roboto">
        <div className={`${!fdata.pechart&& 'hidden'} ${!fdata.pschart?'w-[100%]':'w-[50%'} w-[100%]`}>
          <h1>{`${fdata.id} 12M Forward P/E`}</h1>
          <LineChart chartData={fdata.pechart&&pechartData}/>
        </div>
        <div className={`${!fdata.pschart&& 'hidden'} ${!fdata.pechart&& 'w-[100%]'} w-[100%]`}>
          <h1>{`${fdata.id} 12M Forward P/S`}</h1>
          <LineChart chartData={fdata.pschart&&pschartData}/>
        </div>
      </div>
      <div className='mt-3 select-none'>
      {
        fdata.ratio ?(
          <table className="w-full ">
            <thead className="bg-gray-600 w-full">
              <tr>
                <th className="text-left">FY</th>
                {
                  width <= 734 && fdata.ratio.yaer&&
                  fdata.ratio.yaer.slice(-5).map(yaer => {
                      return(
                        <th>{yaer}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && fdata.ratio.yaer&&
                  fdata.ratio.yaer.slice(-13).map(yaer => {
                      return(
                        <th>{yaer}</th>
                      )
                    })
                }
                {
                  width >= 901 && fdata.ratio.yaer&&
                  fdata.ratio.yaer.map(yaer => {
                      return(
                        <th>{yaer}</th>
                      )
                    })
                }
              </tr>
              <tr className="sm:hidden md:hidden">
                <th className="text-left">Report Date</th>
                {
                  fdata.ratio.date&&
                  fdata.ratio.date.map(yaer => {
                      return(
                        <th>{yaer}</th>
                      )
                    })
                }
              </tr>
            </thead>
            <tbody className="w-full">
              <tr>
                <td className="text-yellow-400 text-left">P/E</td>
                {
                  width <= 734 && fdata.ratio.pe &&
                    fdata.ratio.pe.slice(-5).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && fdata.ratio.pe &&
                    fdata.ratio.pe.slice(-13).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 901 && fdata.ratio.pe &&
                    fdata.ratio.pe.map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
      
              </tr>
              <tr>
                <td className="text-yellow-400 text-left">P/S</td>
                {
                  width <= 734 && fdata.ratio.ps &&
                    fdata.ratio.ps.slice(-5).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && fdata.ratio.ps &&
                    fdata.ratio.ps.slice(-13).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 901 && fdata.ratio.ps &&
                    fdata.ratio.ps.map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }

              </tr>
              <tr>
                <td className="text-yellow-400 text-left">EV/S</td>
                {
                  width <= 734 && fdata.ratio.ev &&
                    fdata.ratio.ev.slice(-5).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && fdata.ratio.ev &&
                    fdata.ratio.ev.slice(-13).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 901 && fdata.ratio.ev &&
                    fdata.ratio.ev.map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
              </tr>
              <tr>
                <td className="text-yellow-400 text-left">P/B</td>
                {
                  width <= 734 && fdata.ratio.pb &&
                    fdata.ratio.pb.slice(-5).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && fdata.ratio.pb &&
                    fdata.ratio.pb.slice(-13).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 901 && fdata.ratio.pb &&
                    fdata.ratio.pb.map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
              </tr>
              <tr>
                <td className="text-yellow-400 text-left">P/CF</td>
                {
                  width <= 734 && fdata.ratio.cf &&
                    fdata.ratio.cf.slice(-5).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && fdata.ratio.cf &&
                    fdata.ratio.cf.slice(-13).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 901 && fdata.ratio.cf &&
                    fdata.ratio.cf.map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
              </tr>
              <tr>
                <td className="text-yellow-400 text-left">P/FCF</td>
                {
                  width <= 734 && fdata.ratio.fcf &&
                    fdata.ratio.fcf.slice(-5).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && fdata.ratio.fcf &&
                    fdata.ratio.fcf.slice(-13).map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
                {
                  width >= 901 && fdata.ratio.fcf &&
                    fdata.ratio.fcf.map(value => {
                      return (
                        <th className='text-yellow-400'>{RatioFor(value)}</th>
                      )
                    })
                }
              </tr>
              <tr>
                <td className="text-yellow-400 text-left">Dividend Yield</td>
                {
                  width <= 734 && fdata.ratio.yeild &&
                    fdata.ratio.yeild.slice(-5).map(value => {
                      return (
                        <th className='text-yellow-400'>{NosymbolPrecentage(value)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && fdata.ratio.yeild &&
                    fdata.ratio.yeild.slice(-13).map(value => {
                      return (
                        <th className='text-yellow-400'>{NosymbolPrecentage(value)}</th>
                      )
                    })
                }
                {
                  width >= 901 &&  fdata.ratio.yeild &&
                    fdata.ratio.yeild.map(value => {
                      return (
                        <th className='text-yellow-400'>{NosymbolPrecentage(value)}</th>
                      )
                    })
                }
              </tr>
            </tbody>
          </table>
        ) : (
          <Restricted/>
        )
      }
    </div>
  </div>
  )
}
