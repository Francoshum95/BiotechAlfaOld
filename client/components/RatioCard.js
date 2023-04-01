export default function RatioCard(props) {
  const {ratio}= props

  function financial(x) {
    return Number.parseFloat(x).toFixed(1)
  } 

  function percnetage(x) {
    const num = x *100
    const value = Number.parseFloat(num).toFixed(1);
    return (value > 0) ? "+" + value +'%' : value +'%';
  } 
  return (
    <div className="grid grid-cols-3 row-auto space-x-3 mt-5 select-none">
      <div className="col-span-1">
        <div className="bg-gray-500">Profitability</div>
          <div className="grid grid-cols-2 auto-rows-auto">
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              ROE
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {percnetage(ratio.returnOnEquityTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              ROA
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {percnetage(ratio.returnOnAssetsTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              ROCE
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {percnetage(ratio.returnOnCapitalEmployedTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Gross Margin
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {percnetage(ratio.grossProfitMarginTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Operation Margin
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {percnetage(ratio.operatingProfitMarginTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Net Margin
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {percnetage(ratio.netProfitMarginTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Asset Turnover
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.assetTurnoverTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              EBIT/Revenue
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.ebitPerRevenueTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              EBT/EBIT
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.ebtPerEbitTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              EBIT/EV
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.enterpriseValueMultipleTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Fixed Asset Turnover
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.fixedAssetTurnoverTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              DIO
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.daysOfInventoryOutstandingTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Net Income/EBT
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.netIncomePerEBTTTM)}
            </div>
          </div>
        </div>
      <div className="col-span-1">
        <div className="bg-gray-500">Cash Flow</div>
          <div className="grid grid-cols-2 auto-rows-auto">
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              CF/CapEX
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.capitalExpenditureCoverageRatioTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              CF Coverage
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.cashFlowCoverageRatiosTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              CF/Debt
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.cashFlowToDebtRatioTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              CF/P
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.operatingCashFlowPerShareTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              FCF/CF
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.freeCashFlowOperatingCashFlowRatioTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              FCF/P
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.freeCashFlowPerShareTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Cash/Share
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.cashPerShareTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              DSO
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.daysOfSalesOutstandingTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              DPO
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.daysOfPayablesOutstandingTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Interest Coverage
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.interestCoverageTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Payout Ratio
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.payoutRatioTTM)}
            </div>
          </div>
      </div>
      <div className="col-span-1">
        <div className="bg-gray-500">Leverage</div>
          <div className="grid grid-cols-2 auto-rows-auto">
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Equity Multiplier
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.companyEquityMultiplierTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              D/E
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.debtEquityRatioTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Current Ratio 
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.currentRatioTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Quick Ratio 
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.quickRatioTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Cash Ratio
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.cashRatioTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Debt Ratio
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.debtRatioTTM)}
            </div>
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              Long-Term Debt/Capitalization 
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.longTermDebtToCapitalizationTTM)}
            </div>
            
            <div className="col-span-1 row-span-1 text-yellow-400 text-left">
              PB
            </div>
            <div className="col-span-1 row-span-1 text-white text-right">
              {financial(ratio.priceBookValueRatioTTM)}
            </div>
          </div>
      </div>
    </div>
  )
}
