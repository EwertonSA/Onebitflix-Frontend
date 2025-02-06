import { Container } from "reactstrap";
import styles from "./styles.module.scss";
const Footer= ()=>{
    return<>
    <Container className={styles.footer}>
    <img src="/logoOnebitcode.svg" className={styles.footerLogo} alt="" />
    <a href="http://onebitcode.com" target={"blank"} className={styles.footerLink}>ONEBITCODE.COM</a>
    </Container>
    </>
}
export default Footer