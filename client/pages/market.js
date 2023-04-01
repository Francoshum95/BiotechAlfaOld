import Head from "next/head";
import { useEffect } from "react";
import protobuf from "protobufjs";
import { Buffer } from "buffer/";
import Table from "../components/Table";
import MarketSelect from "../components/pageselect/MarketSelect";
import { URL_STOCK, WS_STOCK } from "../constants/baseURL";

export default function market({ summaryData }) {
  useEffect(() => {
    const ws = new WebSocket(`wss://${WS_STOCK}/stock`);

    ws.onopen = function open() {
      console.log("connected");
      ws.send("SENS")
    };

    ws.onclose = function close() {
      console.log("disconnected");
    };

    ws.onmessage = function incoming(message) {
      console.log(message)
    };
  }, []);

  return (
    <div className="min-h-screen max-w-screen bg-black font-Roboto pb-10">
      <Head>
        <title>BiotechAlfa - Market </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full bg-red-600 md:h-10 lg:h-10 h-7 flex items-center justify-between">
        <h1 className="text-white text-xs md:text-sm lg:text-lg ml-5">
          Market Watch
        </h1>
        <MarketSelect />
      </div>

      <div className="w-full">
        <Table stockdata={summaryData.Biotechnology} />
        <Table stockdata={summaryData.Pharmaceuticals} />
        <Table stockdata={summaryData.Health_Care_Equipment} />
        <Table stockdata={summaryData.Health_Care_Supplies} />
        <Table stockdata={summaryData.Life_Sciences_Tools_Services} />
        <Table stockdata={summaryData.Health_Care_Services} />
        <Table stockdata={summaryData.Health_Care_Distributors} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const summary = await fetch(`${URL_STOCK}/summary`);
  const summaryData = await summary.json();

  return {
    props: {
      summaryData,
    },
    revalidate: 60 * 60,
  };
}
