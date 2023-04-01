import { Bar } from 'react-chartjs-2';
import { useContext } from 'react';
import { useRouter } from 'next/router'
import { AuthStateContext } from '../context/GlobalContext';
import { STOCK } from '../constants/routers';


export default function WeeklyChart(props) {
  const {chartdata} = props;
  const state = useContext(AuthStateContext);
  const router = useRouter()

  return (
    <div className="bg-black mt-6 rounded-md p-3">
      <Bar 
        data={chartdata}
        options={{
          animation: false,
          responsive: true,
          showLine: false,
          normalized: true,
          parsing: false,
          onClick: function(evt, element){
            if(element.length>0){
              let id = element[0]['element']['$context']['raw']['id']
              router.push(`${STOCK}/${id}&${state.accessToken}`);
            }
          },

          scales: {
            
            y: {beginAtZero: false,
                ticks: {
                  callback: function (value) {
                    return (value * 100).toFixed(0) + '%'; // convert it to percentage
                  },
                color: "#fff"
                }
            },
            x: {
              ticks: {
                color: "#fff"
              }
            }
         }, 
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Relative S&P 500 1 Week Performance',
              color: "#fff",
            }
          }
        }}
      />
      
    </div>
  )
}