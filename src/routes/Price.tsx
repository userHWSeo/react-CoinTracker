import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTodayPrice } from "./api";

const CoinPriceData = styled.div`
  div {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-weight: 400;
  }
`;

interface PriceProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinTodayPrice(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <CoinPriceData>
          <div>Current Price : {data![1].open.toFixed(3)}</div>
          <div>Today High Price : {data![1].high.toFixed(3)}</div>
          <div>Today Low Price : {data![1].low.toFixed(3)}</div>
        </CoinPriceData>
      )}
    </div>
  );
}

export default Price;
