import { Line } from 'react-chartjs-2';

export default function LineChart(props) {
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
          elements: {
            point:{
                radius: 0
            }
          },
          scales: {
            y: {beginAtZero: false,
                ticks: {
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
              display: true,
              position:'bottom',
              labels: {
                color: '#fff'
            }

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
