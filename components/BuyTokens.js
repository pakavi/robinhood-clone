import { styles } from './BuyTokens.styles.js'


const BuyTokens = () => {
  return (
    <form className={styles.formContainer}>
      <div className="flex flex-col h-full w-full items-center">
        <select className={styles.left}>
          <option className={styles.options}>BTC</option>
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
          type="submit"
          //   onClick={() => mint()}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default BuyTokens;
