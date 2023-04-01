export default function FinancialTable(porps) {
  
  return (
    <div className="select-none text-sm">
      <table className="w-full">
        <thead className="bg-gray-600 w-full">
          <tr>
            <th className="text-left">
              (USD)
            </th>
            <th>2022</th>
          </tr>
        </thead>
        <tbody className="w-full">
          <tr className="text-yellow-600 ">
            <th className=" text-left">Revenue</th>
            <th>2333545</th>
          </tr>
          <tr className="text-yellow-400 ">
            <th className=" text-left pl-3">Cost of Sales</th>
            <th>546</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
