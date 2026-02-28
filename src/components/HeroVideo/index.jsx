import React, { useEffect, useState } from 'react';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

/**
 * HeroVideo 组件 - Hero 动态渐变背景（ShaderGradient 官方参数）
 */
function HeroVideo() {
  const [opacity, setOpacity] = useState(1);
  const [pixelDensity, setPixelDensity] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      const heroTitle = document.getElementById('hero-title');
      if (!heroTitle) {
        setOpacity(1);
        return;
      }

      const rect = heroTitle.getBoundingClientRect();
      const titleBottom = rect.bottom;
      const fadeStartDistance = 200;

      if (titleBottom <= 0) {
        setOpacity(0);
      } else if (titleBottom <= fadeStartDistance) {
        setOpacity(titleBottom / fadeStartDistance);
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateDensity = () => {
      const dpr = window.devicePixelRatio || 1;
      const mobile = window.innerWidth < 768;
      if (mobile) {
        setPixelDensity(Math.min(1.5, dpr));
      } else {
        setPixelDensity(Math.min(2, dpr));
      }
    };

    updateDensity();
    window.addEventListener('resize', updateDensity);
    return () => window.removeEventListener('resize', updateDensity);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none"
      style={{
        zIndex: 1,
        opacity,
        transition: 'opacity 0.1s ease-out',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-10%',
          top: '-10%',
          width: '120%',
          height: '120%',
        }}
      >
        <ShaderGradientCanvas
          style={{ position: 'absolute', inset: 0 }}
          pixelDensity={pixelDensity}
          fov={20}
        >
          <ShaderGradient
            animate={opacity > 0.02 ? 'on' : 'off'}
            axesHelper="off"
            brightness={1.15}
            cAzimuthAngle={180}
            cDistance={17.91}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#f6f7c3"
            color2="#d0f3f5"
            color3="#d4ecbd"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={20}
            frameRate={10}
            gizmoHelper="hide"
            grain="on"
            lightType="3d"
            loop="off"
            loopDuration={0.1}
            pixelDensity={pixelDensity}
            positionX={0}
            positionY={0}
            positionZ={0}
            range="enabled"
            rangeEnd={46.5}
            rangeStart={20.5}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            toggleAxis={false}
            type="waterPlane"
            uAmplitude={1.3}
            uDensity={0.4}
            uFrequency={5.5}
            uSpeed={0.3}
            uStrength={4}
            uTime={45.92}
            wireframe={false}
            zoomOut={false}
          />
        </ShaderGradientCanvas>
      </div>
    </div>
  );
}

export default HeroVideo;
