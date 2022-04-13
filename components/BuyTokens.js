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
    toCoin,
    amount,
    setToCoin,
  } = useContext(RobinhoodContext);

  return (
    <form className={styles.formContainer}>
      <div className="flex flex-col h-full w-full items-center">
        <select
          className={styles.left}
          value={coinSelect}
          onChange={(e) => setCoinSelect(e.target.value)}
        >
          <option className={styles.options}>BTC</option>
          <option className={styles.options}>DOGE</option>
          <option className={styles.options}>ETH</option>
          <option className={styles.options}>SOL</option>
          <option className={styles.options}>USDC</option>
        </select>
        <select
          className={styles.left}
          value={toCoin}
          onChange={(e) => setToCoin(e.target.value)}
        >
          <option className={styles.options}>BTC</option>
          <option className={styles.options}>DOGE</option>
          <option className={styles.options}>ETH</option>
          <option className={styles.options}>SOL</option>
          <option className={styles.options}>USDC</option>
        </select>
        <input
          className={styles.inputAmount}
          type="text"
          placeholder="Amount..."
        />
        <button
          className={styles.noticeCTA}
          type="button"
          onClick={() => mint()}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default BuyTokens;
