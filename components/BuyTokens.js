import { useContext } from "react";

import { RobinhoodContext } from "../context/RobinhoodContext.js";

import { styles } from "./BuyTokens.styles.js";


const BuyTokens = () => {
  const {
    isAuthenticated,
    setAmount,
    mint,
    setCoinSelect,
    coinSelect,
    amount,
    toCoin,
    setToCoin,
  } = useContext(RobinhoodContext);

  return (
    <form className={styles.formContainer}>
      <div className="flex h-full w-full flex-col items-center">
        <select
          className={styles.select}
          value={coinSelect}
          onChange={(e) => setCoinSelect(e.target.value)}
        >
          <option className={styles.options} value="ETH">
            ETH
          </option>
          <option className={styles.options} value="DOGE">
            DOGE
          </option>
          <option className={styles.options} value="USDC">
            USDC
          </option>
          <option className={styles.options} value="LINK">
            LINK
          </option>
          <option className={styles.options} value="DAI">
            DAI
          </option>
        </select>
        <select
          className={styles.select}
          value={toCoin}
          onChange={(e) => setToCoin(e.target.value)}
        >
          <option className={styles.options} value="DOGE">
            DOGE
          </option>
          <option className={styles.options} value="USDC">
            USDC
          </option>
          <option className={styles.options} value="LINK">
            LINK
          </option>
          <option className={styles.options} value="DAI">
            DAI
          </option>
        </select>
        <input
          placeholder="Amount..."
          className={styles.inputAmount}
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className={styles.noticeCTA}
          type="button"
          disabled={!isAuthenticated}
          onClick={() => mint()}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default BuyTokens;
