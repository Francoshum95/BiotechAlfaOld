import { Line } from 'react-chartjs-2';

export default function EarningsChart(props) {
  const {chartData} = props;

  return (
    <div className="w-full h-[180px]">
      <Line 
        data={chartData}
        height={null}
        width={null}
        options={{
          animation: false,
          responsive: true,
          maintainAspectRatio: false, 
          scales: {
            y: {beginAtZero: false,
                ticks: {
                  callback: function(label, index, labels) {
                    if (label>=10000 && label<100000000){
                      return "$" + label/1000000+'M';
                    } else if(label>=100000000){
                      return "$" + label/1000000000+'B';
                    }
                    else{
                      return "$" +label.toFixed(1)
                    }
                },
                color: "#fff"
                }
            },
            x: {
              ticks: {
                color: "#fff",
                maxTicksLimit: 6,
                maxRotation: 0,
                minRotation: 0
              }
            }
        }, 
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            }
          }
        }}
      />
    </div>
  )
}
