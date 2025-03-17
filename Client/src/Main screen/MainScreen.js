import './MainScreen.css';
import logo from '../Assets/logo.png';
import { useGlitch } from 'react-powerglitch';
import LoadingScreen from '../Loading Screen/LoadingScreen';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function MainScreen() {
    const glitch = useGlitch({ playMode: 'hover' });
    const [isVisible, setIsVisible] = useState(false);
    const [loadingImageType, setLoadingImageType] = useState('logo');
    const [loadingTextType, setLoadingTextType] = useState(0);
    const [extraButtonsVisible, setExtraButtonsVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='mainscreen-body'>
            <img src={logo} alt='' className='mainscreen-logo' />
            <br />
            <div className='mainscreen-buttons'>
                <h2
                    onClick={() => {
                        setExtraButtonsVisible(!extraButtonsVisible); // Show extra buttons
                    }}
                    className='mainscreen-buttons-defense'
                >
                    <span ref={glitch.ref}>DEFENSE</span>
                </h2>
                <h2
                    onClick={() => {
                        setIsVisible(true);
                        setLoadingImageType('handler');
                        setLoadingTextType(10);
                    }}
                    className='mainscreen-buttons-space'
                >
                    {' '}
                    /{' '}
                </h2>
                <h2
                    onClick={() => {
                        setIsVisible(true);
                        setLoadingImageType('logo');
                        setLoadingTextType(2);
                    }}
                    className='mainscreen-buttons-attack'
                >
                    {' '}
                    <span ref={glitch.ref}>ATTACK</span>{' '}
                </h2>
            </div>

            <div
                className='extra-buttons'
                style={{visibility: extraButtonsVisible ? 'visible' : 'hidden'}}
            >
                <h3
                    className='extra-button mail-button'
                    onClick={() => {
                        setLoadingImageType('logo');
                        setLoadingTextType(1);
                        setIsVisible(true);
                    }}>
                    <span ref={glitch.ref}>PROFILE</span>
                </h3>
                <h3
                    className='extra-button profile-button'
                    onClick={() => {
                        setLoadingImageType('logo');
                        setLoadingTextType(7);
                        setIsVisible(true);
                    }}>
                    <span ref={glitch.ref}>MAIL</span>
                </h3>
            </div>

            <LoadingScreen
                isVisible={isVisible}
                onClose={() => {
                    setIsVisible(false);
                    if(loadingTextType === 1) navigate('/profiles');
                    else if(loadingTextType === 7) navigate('/messages');
                }}
                imageType={loadingImageType}
                textType={loadingTextType}
            />
        </div>
    );
}

export default MainScreen;
