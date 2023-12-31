import Header from '../components/Header'
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss'
import classNames from 'classnames/bind';
import { sliderimg } from '../../../assets/images'
import gsap from 'gsap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Footer from '../components/Footer';
import { useEffect } from 'react';
const cx = classNames.bind(styles)
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', right: '10px' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', left: '10px', zIndex: '2' }}
            onClick={onClick}
        />
    );
}
function DefaultLayout({ children }) {


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplaySpeed: 2000,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    useEffect(() => {
        const marqueeText = document.getElementById('marquee-text');
        const startLocation = -500;
        const endLocation = 500;

        gsap.set(marqueeText, { x: startLocation });



        gsap.to(marqueeText, {
            x: endLocation,
            duration: 5,
            repeat: 0,
            ease: 'linear',
            onComplete: () => {
                // Ẩn phần tử sau khi hiệu ứng hoàn tất (nếu muốn)
                marqueeText.style.display = 'none';
            },
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('my-container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />


                </div>
                <div id="marquee-container">
                    <div className={cx('text')} id="marquee-text">Chào mừng bạn đến với TB Technology! Chúc bạn mua sắm vui vẻ.</div>
                </div>
                <div className={styles.slider}>
                    <Slider {...settings}>
                        {sliderimg.map((image, index) => {
                            return (
                                <div key={index} className={styles.wrap}>
                                    <img src={image.link} alt='' className={cx('styles.img')} />
                                </div>
                            );
                        })}


                    </Slider>
                </div>



                <div className={cx('content')}>{children}</div>

            </div>
            <Footer></Footer>
        </div>
    );
}

export default DefaultLayout;
