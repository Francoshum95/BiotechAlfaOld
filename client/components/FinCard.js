import { NosymbolPrecentage, dataFormat, RatioFor} from "./format/Format";

export default function FinCard(props) {
  const {stockdata} = props;
  const {findata} = stockdata;
  const Findata = findata.FinData;
  const {width} = stockdata;

  // const [income, setincome] = useState(true);
  // const [cashflowm, setCashflow] = useState(false);
  // const [balance, setbalance] = useState(false);

  // const [annual, setAnnual] = useState(true);
  // const [quarter, setQuarter] = useState(false);

  // const changeStatementHandler = (event) =>{
  //   if (event.target.value === 'Income Statement'){
  //     setincome(true);
  //     setCashflow(false);
  //     setbalance(false);
  //   } else if (event.target.value === 'Cash Flow Statement'){
  //     setincome(false);
  //     setCashflow(true);
  //     setbalance(false);
  //   } else if (event.target.value === 'Balance Sheet'){
  //     setincome(false);
  //     setCashflow(false);
  //     setbalance(true);
  //   } 
  // }

  // const changePeriodHandler = (event) =>{
  //   if (event.target.value === 'Annual'){
  //     setAnnual(true);
  //     setQuarter(false);
  //   } else if (event.target.value === 'Quarter'){
  //     setAnnual(false);
  //     setQuarter(true);
  //   }
  // }

  return (
    <div className="mt-5 w-full font-Manrope ">
      <div className="flex float-right mb-1">
        {/* <select name="period" id="period-select" className="bg-yellow-500 text-black mr-2 p-1 z-10"
          onChange={changePeriodHandler}>
          <option value="Annual" >Annual</option>
          <option value="Quarter">Quarter</option>
        </select>
        <select name="period" id="period-select" className="bg-yellow-500 text-black"
          onChange={changeStatementHandler}>
          <option value="Income Statement">Income Statement</option>
          <option value="Cash Flow Statement">Cash Flow Statement</option>
          <option value="Balance Sheet">Balance Sheet</option>
        </select> */}
      </div>
        <div className="select-none">
          <table className="w-full">
            <thead className="bg-gray-600 w-full">
              <tr>
                <th className="text-left">
                  (USD)
                </th>
                  {
                    width <= 734 && Findata.yaer &&
                    Findata.yaer.slice(-4).map(yaer => {
                        return (
                          <th>{yaer}</th>
                        )
                      })
                  }
                  {
                    width >= 735 && width <= 900 && Findata.yaer &&
                    Findata.yaer.slice(-13).map(yaer => {
                        return (
                          <th>{yaer}</th>
                        )
                      })
                  }
                  {
                    width >= 901 && Findata.yaer&&
                    Findata.yaer.map(yaer => {
                        return(
                          <th>{yaer}</th>
                        )
                      })
                  }
              </tr>
            </thead>
            <tbody className="w-full">
              <tr className="text-yellow-400 ">
                <th className=" text-left">Gross Margin</th>
                {
                  width <= 734 && Findata.gpm &&
                  Findata.gpm.slice(-4).map(gpm => {
                      return (
                        <th>{NosymbolPrecentage(gpm)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.gpm &&
                  Findata.gpm.slice(-13).map(gpm => {
                      return (
                        <th>{NosymbolPrecentage(gpm)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.gpm &&
                  Findata.gpm.map(gpm => {
                      return (
                        <th>{NosymbolPrecentage(gpm)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400 ">
                <th className=" text-left">R&D Experence %</th>
                {
                  width <= 734 && Findata.rndexpence &&
                  Findata.rndexpence.slice(-4).map(rndexpence => {
                      return (
                        <th>{NosymbolPrecentage(rndexpence)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.rndexpence &&
                  Findata.rndexpence.slice(-13).map(rndexpence => {
                      return (
                        <th>{NosymbolPrecentage(rndexpence)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.rndexpence &&
                  Findata.rndexpence.map(rndexpence => {
                      return (
                        <th>{NosymbolPrecentage(rndexpence)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400 ">
                <th className=" text-left">General & Marketing Experence %</th>
                {
                  width <= 734 && Findata.rndexpence &&
                  Findata.rndexpence.slice(-4).map(rndexpence => {
                      return (
                        <th>{NosymbolPrecentage(rndexpence)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.rndexpence &&
                  Findata.rndexpence.slice(-13).map(rndexpence => {
                      return (
                        <th>{NosymbolPrecentage(rndexpence)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.rndexpence &&
                  Findata.rndexpence.map(rndexpence => {
                      return (
                        <th>{NosymbolPrecentage(rndexpence)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400 ">
                <th className=" text-left">Net Margin</th>
                {
                  width <= 734 && Findata.netmargin &&
                  Findata.netmargin.slice(-4).map(netmargin => {
                      return (
                        <th>{NosymbolPrecentage(netmargin)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.netmargin &&
                  Findata.netmargin.slice(-13).map(netmargin => {
                      return (
                        <th>{NosymbolPrecentage(netmargin)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.netmargin &&
                  Findata.netmargin.map(netmargin => {
                      return (
                        <th>{NosymbolPrecentage(netmargin)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400 leading-[3rem]">
                <th className=" text-left invisible">space</th>
              </tr>

              <tr className="text-yellow-400">
                <th className=" text-left ">Opertaion Cash Flow</th>
                {
                  width <= 734 && Findata.cf &&
                  Findata.cf.slice(-4).map(cf => {
                      return (
                        <th>{dataFormat(cf)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.cf &&
                  Findata.cf.slice(-13).map(cf => {
                      return (
                        <th>{dataFormat(cf)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.cf &&
                  Findata.cf.map(cf => {
                      return (
                        <th>{dataFormat(cf)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400 ">
                <th className=" text-left ">CapEx</th>
                {
                  width <= 734 && Findata.capex &&
                  Findata.capex.slice(-4).map(capex => {
                      return (
                        <th>{dataFormat(capex)}</th>
                      )
                    })
                }
                {
                 width >= 735 && width <= 900 && Findata.capex &&
                  Findata.capex.slice(-13).map(capex => {
                      return (
                        <th>{dataFormat(capex)}</th>
                      )
                    })
                }
                {
                 width >= 901 &&  Findata.capex &&
                  Findata.capex.map(capex => {
                      return (
                        <th>{dataFormat(capex)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400 ">
                <th className=" text-left ">Free Cash Flow</th>
                {
                  width <= 734 && Findata.fcf &&
                  Findata.fcf.slice(-4).map(fcf => {
                      return (
                        <th>{dataFormat(fcf)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.fcf &&
                  Findata.fcf.slice(-13).map(fcf => {
                      return (
                        <th>{dataFormat(fcf)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.fcf &&
                  Findata.fcf.map(fcf => {
                      return (
                        <th>{dataFormat(fcf)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400">
                <th className=" text-left ">Shares Issued</th>
                {
                  width <= 734 && Findata.shareissue &&
                  Findata.shareissue.slice(-4).map(shareissue => {
                      return (
                        <th>{dataFormat(shareissue)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.shareissue &&
                  Findata.shareissue.slice(-13).map(shareissue => {
                      return (
                        <th>{dataFormat(shareissue)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.shareissue &&
                  Findata.shareissue.map(shareissue => {
                      return (
                        <th>{dataFormat(shareissue)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400">
                <th className=" text-left ">Shares Repurchase</th>
                {
                  width <= 734 && Findata.sharepurchase &&
                  Findata.sharepurchase.slice(-4).map(sharepurchase => {
                      return (
                        <th>{dataFormat(sharepurchase)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.sharepurchase &&
                  Findata.sharepurchase.slice(-13).map(sharepurchase => {
                      return (
                        <th>{dataFormat(sharepurchase)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.sharepurchase &&
                  Findata.sharepurchase.map(sharepurchase => {
                      return (
                        <th>{dataFormat(sharepurchase)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400 leading-[3rem]">
                <th className=" text-left invisible">space</th>
              </tr>
              <tr className="text-yellow-400">
                <th className=" text-left ">Current Ratio</th>
                {
                  width <= 734 && Findata.currentratio &&
                  Findata.currentratio.slice(-4).map(currentratio => {
                      return (
                        <th>{RatioFor(currentratio)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.currentratio &&
                  Findata.currentratio.slice(-13).map(currentratio => {
                      return (
                        <th>{RatioFor(currentratio)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.currentratio &&
                  Findata.currentratio.map(currentratio => {
                      return (
                        <th>{RatioFor(currentratio)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400">
                <th className=" text-left ">Quick Ratio</th>
                {
                  width <= 734 && Findata.quickratio &&
                  Findata.quickratio.slice(-4).map(quickratio => {
                      return (
                        <th>{RatioFor(quickratio)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.quickratio &&
                  Findata.quickratio.slice(-13).map(quickratio => {
                      return (
                        <th>{RatioFor(quickratio)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.quickratio &&
                  Findata.quickratio.map(quickratio => {
                      return (
                        <th>{RatioFor(quickratio)}</th>
                      )
                    })
                }
              </tr>
              <tr className="text-yellow-400">
                <th className=" text-left ">Leverage Ratio</th>
                {
                  width <= 734 && Findata.leverageratio &&
                  Findata.leverageratio.slice(-4).map(leverageratio => {
                      return (
                        <th>{RatioFor(leverageratio)}</th>
                      )
                    })
                }
                {
                  width >= 735 && width <= 900 && Findata.leverageratio &&
                  Findata.leverageratio.slice(-13).map(leverageratio => {
                      return (
                        <th>{RatioFor(leverageratio)}</th>
                      )
                    })
                }
                {
                  width >= 901 && Findata.leverageratio &&
                  Findata.leverageratio.map(leverageratio => {
                      return (
                        <th>{RatioFor(leverageratio)}</th>
                      )
                    })
                }
              </tr>

            </tbody>
          </table>
      </div>
    </div>
  )
}
