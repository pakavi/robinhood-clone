import { useContext } from "react";
import Image from "next/image";

import { AiOutlineSearch } from "react-icons/ai";
import { RobinhoodContext } from "../context/RobinhoodContext.js";

import logo from "../assets/logo.png";

import { styles } from './Header.styles.js'


const Header = () => {
  const {
    connectWallet,
    signout,
    currentAccount,
    isAuthenticated,
    formattedAccount,
  } = useContext(RobinhoodContext);

  return (
    <div className={styles.container}>
      <div className={styles.leftHeader}>
        <Image className={styles.logo} src={logo} height={100} width={100} />
      </div>
      <div className={styles.searchWrapper}>
        <div className={styles.searchInputContainer}>
          <AiOutlineSearch className={styles.searchIcon} />
          <div className={styles.searchInputWrapper}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <div className={styles.rightHeader}>
        <div className={styles.menuItem}>Rewards</div>
        <div className={styles.menuItem}>Portfolio</div>
        <div className={styles.menuItem}>Cash</div>
        <div className={styles.menuItem}>Messages</div>

        {isAuthenticated && (
          <>
            <div className={styles.menuItem}>{formattedAccount}</div>
            <div className={styles.menuItem} onClick={() => signout()}>
              Logout
            </div>
          </>
        )}

        {!isAuthenticated && (
          <div className={styles.menuItem} onClick={() => connectWallet()}>
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
