import { useState, useContext } from "react";
import axios from "axios";

import { RobinhoodContext } from "../context/RobinhoodContext.js";

import PortfolioChart from "../components/PortfolioChart.js";
import BuyTokens from "../components/BuyTokens.js";

import Header from "../components/Header.js";
import Notice from "../components/Notice.js";
import Assets from "../components/Assets.js";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import { styles } from "./index.styles.js";


export default function Home({ coins }) {
  const [myCoins] = useState([...coins.slice(0, 15)]);
  const { balance } = useContext(RobinhoodContext);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.leftMain}>
          <div className={styles.portfolioAmountContainer}>
            <div className={styles.portfolioAmount}>23 ETH</div>
            <div className={styles.portfolioPercent}>
              +0.0008(+0.57%) <span className={styles.pastHour}>Past Hour</span>
            </div>
          </div>
          <div>
            <div className={styles.chartContainer}>
              <PortfolioChart />
            </div>
          </div>
          <div className={styles.buyingPowerContainer}>
            <div className={styles.buyingPowerTitle}>Buying Power</div>
            <div className={styles.buyingPowerAmount}>23 ETH</div>
          </div>
          <div className={styles.notice}>
            <div className={styles.noticeContainer}>
              <div className={styles.noticeTitle}>Send Funds</div>
              <div className={styles.noticeMessage}>
                Transfer your funds here.
              </div>
              <BuyTokens />
            </div>
          </div>
          <Notice />
        </div>
        <div className={styles.rightMain}>
          <div className={styles.rightMainItem}>
            <div className={styles.ItemTitle}>Crypto Currencies</div>
            <BiDotsHorizontalRounded className={styles.moreOptions} />
          </div>
          {myCoins.map((coin) => {
            let price = parseFloat(coin.price);
            price = price.toFixed(2);
            return <Assets key={coin.uuid} coin={coin} price={price} />;
          })}
          <div className={styles.rightMainItem}>
            <div className={styles.ItemTitle}>Lists</div>
            <AiOutlinePlus className={styles.moreOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      tiers: "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Host": process.env.COIN_RANKING_HOST,
      "X-RapidAPI-Key": process.env.COIN_RANKING_KEY,
    },
  };

  const res = await axios.request(options);
  const coins = res.data.data.coins;

  return {
    props: { coins },
  };
};
