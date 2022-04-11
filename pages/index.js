import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import Header from '../components/Header.js'
import BuyTokens from '../components/BuyTokens.js'
import Notice from '../components/Notice.js'
import Assets from '../components/Assets.js'

import { styles } from './index.styles.js'


export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.leftMain}>
          <div className={styles.portfolioAmountContainer}>
            <div className={styles.portfolioAmount}>23 ETH</div>
            <div className={styles.portfolioPercent}>
              +0.0008(+0.57%)
              {' '}<span className={styles.pastHour}>Past Hour</span>
            </div>
          </div>
          <div>
            <div className={styles.chartContainer}>
              {/* <PortfolioContainer /> */}
            </div>
          </div>
          <div className={styles.buyingPowerContainer}>
            <div className={styles.buyingPowerTitle}>Buying Power</div>
            <div className={styles.buyingPowerAmount}>12 ETH</div>
          </div>
          <div className={styles.notice}>
            <div className={styles.noticeContainer}>
              <div className={styles.noticeTitle}>Sends Funds</div>
              <div className={styles.noticeMessage}>
                Transfer your funds here
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
          <Assets coin={"BTC"} price={0.89} />
          <Assets coin={"ETH"} price={0.64} />
          <div className={styles.rightMainItem}>
            <div className={styles.ItemTitle}>Lists</div>
            <AiOutlinePlus className={styles.moreOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
