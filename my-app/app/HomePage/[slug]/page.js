'use client'
import styles from "./page.module.css";
import { useParams } from "next/navigation";

const slug = () =>{
    const { slug } = useParams();
    return <p className={styles.found}>id : {slug} </p>;
    
};
 
export default slug



