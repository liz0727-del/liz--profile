import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * StickyCursor 组件
 * 
 * 实现了以下功能：
 * 1. 跟随鼠标的惯性光标 (使用 useSpring)
 * 2. 悬停交互 (Hover State): 当悬停在链接或按钮上时放大
 * 3. 点击粒子效果 (Particle Burst): 点击时产生扩散粒子
 * 4. 混合模式 (Difference Blend Mode): 确保在深色/浅色背景上都可见
 */
const StickyCursor = () => {
    // 鼠标位置的 MotionValue
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 每一帧平滑移动的 Spring value
    // stiffness: 刚度, damping: 阻尼, mass: 质量
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // 状态管理
    const [isHovered, setIsHovered] = useState(false); // 是否悬停在可交互元素上
    const [isClicked, setIsClicked] = useState(false); // 是否处于点击状态
    const [particles, setParticles] = useState([]); // 存储粒子数组

    // 粒子 ID 计数器，用于生成唯一 key
    const particleIdCounter = useRef(0);

    useEffect(() => {
        // 鼠标移动处理函数
        const handleMouseMove = (e) => {
            // 更新目标位置，减去光标半径以居中
            // 假设默认半径为 8px (w-4 h-4)
            mouseX.set(e.clientX - 8);
            mouseY.set(e.clientY - 8);
        };

        // 鼠标按下处理函数
        const handleMouseDown = (e) => {
            setIsClicked(true);
            createParticles(e.clientX, e.clientY);
        };

        // 鼠标抬起处理函数
        const handleMouseUp = () => {
            setIsClicked(false);
        };

        // 悬停检测逻辑
        const handleMouseOver = (e) => {
            // 检查目标元素或其父级是否是链接/按钮
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovered(true);
            }
        };

        const handleMouseOut = (e) => {
            // 简单的悬停退出检测，实际应用中可能需要更复杂的逻辑
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovered(false);
            }
        };


        // 添加全局事件监听
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        // 使用 mouseover/mouseout 进行事件委托来检测 hover
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        // 清理函数
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [mouseX, mouseY]);

    // 创建粒子函数
    const createParticles = (x, y) => {
        const particleCount = 8;
        const newParticles = [];

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: particleIdCounter.current++,
                x: x,
                y: y,
                angle: (i / particleCount) * 360, // 均匀分布的角度
            });
        }

        // 添加新粒子
        setParticles(prev => [...prev, ...newParticles]);

        // 1秒后清理这些粒子（虽然 AnimatePresence 会处理 DOM 移除，但状态也需要清理）
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 1000);
    };

    return (
        <>
            {/* 主光标 */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    scale: isHovered ? 2.5 : isClicked ? 0.8 : 1, // 悬停放大，点击缩小
                }}
                transition={{
                    scale: { duration: 0.2 } // 缩放动画时间
                }}
            />

            {/* 点击产生的粒子 */}
            <AnimatePresence>
                {particles.map((particle) => (
                    <Particle key={particle.id} x={particle.x} y={particle.y} angle={particle.angle} />
                ))}
            </AnimatePresence>
        </>
    );
};

/**
 * 单个粒子组件
 */
const Particle = ({ x, y, angle }) => {
    return (
        <motion.div
            className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
            initial={{
                x: x,
                y: y,
                opacity: 1,
                scale: 1
            }}
            animate={{
                //根据角度向外扩散 50px
                x: x + Math.cos(angle * Math.PI / 180) * 50,
                y: y + Math.sin(angle * Math.PI / 180) * 50,
                opacity: 0,
                scale: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        />
    );
};

export default StickyCursor;
