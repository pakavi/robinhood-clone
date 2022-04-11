import { styles } from './Notice.styles.js'


const Notice = () => {
  return (
    <div className={styles.notice}>
      <div className={styles.noticeContainer}>
        <div className={styles.noticeTitle}>Fund Your Account</div>
        <div className={styles.noticeMessage}>
          Your bank account is ready! Fund your Robinhood account to begin
          trading
        </div>
      </div>
      <div className={styles.noticeCTA}>Add Funds</div>
    </div>
  );
};

export default Notice;
