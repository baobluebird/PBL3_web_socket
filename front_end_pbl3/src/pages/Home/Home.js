import classNames from "classnames/bind";
import styles from './Home.module.scss'


import { useState, useEffect, useContext } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProductByNameService } from "~/Services/ProductServices";
import { toast } from 'react-toastify';
import { UserContext } from '~/context/UserContext';

import socket from "../socket";
import ProductSlider from "~/components/Layout/components/ProductSlider";

const cx = classNames.bind(styles)

function Home() {
    const [logitechProduct, setLogitechProduct] = useState([])
    const [razerProduct, setRazerProduct] = useState([])
    const [corsairProduct, setCorsairProduct] = useState([])
    const [duckyProduct, setDuckyProduct] = useState([])
    const [steelseriesProduct, setSteelseriesProduct] = useState([])
    const [messageShown, setMessageShown] = useState(false);
    const {logout} = useContext(UserContext);

    const navigate = useNavigate()

    useEffect(() => {
        socket?.on('chatStarted', (msg) => {
            toast.success(msg);
        });
        const checkActive = localStorage.getItem('userId')
        const checkAdmin = localStorage.getItem('isAdmin')
        if (checkActive) {
            socket?.emit('addUser', checkActive);
            if (!messageShown) {
                socket?.on('getMessage', (user) => {
                    toast.success(`Shop đã gửi tin nhắn cho bạn`);
                })
            }
            socket?.on('getMessageToAdmin', (user) => {
                if (checkAdmin === "true") {
                    toast.success(`${user.nameUser} đã gửi tin nhắn cho bạn`);
                }
            })
            socket?.on('userPayment', (msg) => {
                if (checkAdmin === "true") {
                    toast.success(msg);
                }
            });
        }
        return () => {
            socket?.off('chatStarted');
            socket?.off('getMessage');
            socket?.off('userPayment');
        };
    }, [messageShown, socket]);

    useEffect(() => {
        renderProductLogitech()
        renderProductRazer()
        renderProductCorSair()
        renderProductDucky()
        renderProdcutSteelseries()

    }, [])
    const renderProductLogitech = async () => {
        const resLogitech = await getProductByNameService('logitech')
        if (resLogitech.data.status === 'success') {
            setLogitechProduct(resLogitech.data.data)
        }
    }
    const renderProductRazer = async () => {
        const resRazer = await getProductByNameService('razer')
        if (resRazer.data.status === 'success') {
            setRazerProduct(resRazer.data.data)
        }
    }
    const renderProductCorSair = async () => {
        const resCorsair = await getProductByNameService('corsair')
        if (resCorsair.data.status === 'success') {
            setCorsairProduct(resCorsair.data.data)
        }
    }
    const renderProductDucky = async () => {
        const resDucky = await getProductByNameService('ducky')
        if (resDucky.data.status === 'success') {
            setDuckyProduct(resDucky.data.data)

        }
    }
    const renderProdcutSteelseries = async () => {
        const resSteelseries = await getProductByNameService('steelseries')
        if (resSteelseries.data.status === 'success') {
            setSteelseriesProduct(resSteelseries.data.data)
        }
    }
    const handleSeeAll = (category) => {
        navigate(`/product?type=${category}`)
    }

    return (
        <div className={cx('wrapper')}>


            <div id="logitech" className={cx('titleProduct')}>BÀN PHÍM LOGITECH</div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('logitech')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={logitechProduct} />
            </div>
            <div id="razer" className={cx('titleProduct')}>BÀN PHÍM RAZER </div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('razer')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={razerProduct} />
            </div>
            <div id="corsair" className={cx('titleProduct')}>BÀN PHÍM CORSAIR </div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('corsair')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={corsairProduct} />
            </div>
            <div id="steelseries" className={cx('titleProduct')}>BÀN PHÍM STEELSERIES  </div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('corsair')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={steelseriesProduct} />
            </div>
            <div id="ducky" className={cx('titleProduct')}>BÀN PHÍM DUCKY </div>
            <div className={cx('container')} >
                <div className={cx('header')} onClick={() => handleSeeAll('corsair')}>Xem tất cả <FaAngleDoubleRight style={{ color: '#a22327' }} /></div>
                <ProductSlider products={duckyProduct} />
            </div>


        </div >
    );
}

export default Home;