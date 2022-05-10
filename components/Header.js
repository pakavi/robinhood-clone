import { useContext } from "react";
import Image from "next/image";

import { AiOutlineSearch } from "react-icons/ai";
import { RobinhoodContext } from "../context/RobinhoodContext.js";

import logo from "../assets/logo.png";

import { styles } from "./Header.styles.js";


const Header = () => {
  const {
    connectWallet,
    signOut,
    currentAccount,
    isAuthenticated,
    formattedAccount,
    swapTokens,
  } = useContext(RobinhoodContext);

  return (
    <div className={styles.container}>
      <div className={styles.leftHeader}>
        <Image src={logo} alt="Logo" height={100} width={100} className={styles.logo} />
      </div>
      <div className={styles.searchWrapper}>
        <div className={styles.searchInputContainer}>
          <AiOutlineSearch className={styles.searchIcon} />
          <div className={styles.searchInputWrapper}>
            <input placeholder="Search..." className={styles.searchInput} />
          </div>
        </div>
      </div>
      <div className={styles.rightHeader}>
        <div className={styles.menuItem} onClick={swapTokens}>
          Rewards
        </div>
        <div className={styles.menuItem}>Portfolio</div>
        <div className={styles.menuItem}>Cash</div>
        <div className={styles.menuItem}>Messages</div>
        {isAuthenticated && (
          <>
            <div className={styles.menuItem}>{formattedAccount}</div>
            <div className={styles.menuItem} onClick={() => signOut()}>
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
