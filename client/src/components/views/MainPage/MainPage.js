import React, { useEffect, useRef, memo } from 'react'
import './Sections/MainPage.css';
import introImg1 from '../../../images/intro_page_01.jpg';
import introImg2 from '../../../images/intro_page_02.jpg';
import introImg3 from '../../../images/intro_page_03.jpg';
import introImg4 from '../../../images/intro_page_04.jpg';
import introImg5 from '../../../images/intro_page_05.jpg';
import { Link } from 'react-router-dom';

const MainPage = memo(() => {
    const bannerRef = useRef();
    const scrollFn = () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
        let lists = bannerRef.current.querySelectorAll('li');
        lists.forEach(el => {
            if (scrollTop > el.offsetTop - window.innerHeight / 2) {
                el.classList.add('active');
            }
        });
    }
    useEffect(() => {
        let timer = setTimeout(()=> {
            bannerRef.current.querySelector('li').classList.add('active');
        },200);
        return () => {clearTimeout(timer);}
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', scrollFn);
        return () => {
            window.removeEventListener('scroll', scrollFn);
        }
    }, []);

    return (
        <div className="main-page-wrapper">
            <ul className="intro-list-wrap" ref={bannerRef}>
                <li>
                    <Link to="/shop/3">
                        <img src={introImg1} alt="메인이미지1" className="intro-img"/>
                        <p className='clearfix'>
                            <span className="intro-title">THE NEW R WEAR</span>
                            <span className="intro-context">
                                드는 가방 대신 입는 가방<br/>
                                SHOP NOW
                            </span>
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to="/shop/2">
                        <img src={introImg2} alt="메인이미지2" className="intro-img"/>
                        <p className='clearfix'>
                            <span className="intro-title">R EYE</span>
                            <span className="intro-context">
                                10년을 쓰는 안경<br/>
                                SHOP NOW
                            </span>
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to="/shop/1">
                        <img src={introImg3} alt="메인이미지3" className="intro-img"/>
                        <p className='clearfix'>
                            <span className="intro-title">STRING COLOR <br/>BLOCK</span>
                            <span className="intro-context">
                                스트링을 더 쌩쌩하게 색칠한<br/>
                                SHOP NOW
                            </span>
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to="/shop/1">
                        <img src={introImg4} alt="메인이미지4" className="intro-img"/>
                        <p className='clearfix'>
                            <span className="intro-title">CORDUROY SERIES</span>
                            <span className="intro-context">
                                따뜻한 코듀로이를 만난 R BAG<br/>
                                SHOP NOW
                            </span>
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to="/shop/3">
                        <img src={introImg5} alt="메인이미지5" className="intro-img"/>
                        <p className='clearfix'>
                            <span className="intro-title">RAW TRIP</span>
                            <span className="intro-context">
                                훌쩍 떠나고 싶은 사람을 위하여<br/>
                                SHOP NOW
                            </span>
                        </p>
                    </Link>
                </li>
            </ul>
        </div>
    )
});

export default MainPage
