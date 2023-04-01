import EarningsTable from './EarningsTable';
import EarningsChart from './EarningsChart';

export default function EarningsCard(props) {
  const {earnings} = props;

  const {revenueChart} = earnings;
  const {epsChart} = earnings;
  const {earningsData} = earnings;
  const {width} = earnings;

  const revenuedata = earningsData.revenue
  const epsdata = earningsData.eps

  
  return (

    <div className="flex flex-col mt-5 font-Manrope w-full">
      <div className="flex-col">
        <div className="w-full bg-gray-600 text-white shadow-md">Revenue Trend</div>
        <div className="bg-black text-white w-[100%]">
          <EarningsChart chartData={revenueChart}/>
          <EarningsTable earnings={{date:revenuedata.date, fy:revenuedata.revenueFY, width}}/>
        </div>
      </div>
      <div className="flex-col mt-5">
        <div className="w-full bg-gray-600 text-white shadow-md">EPS Trend</div>
        <div className="bg-black text-white w-[100%]">
          <EarningsChart chartData={epsChart}/>
          <EarningsTable earnings={{date:epsdata.date, fy: epsdata.epsFY, width}}/>
        </div>
      </div>
    </div>
  )
}


