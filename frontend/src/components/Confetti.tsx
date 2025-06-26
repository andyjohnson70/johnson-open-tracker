import Pride from 'react-canvas-confetti/dist/presets/pride';
import { TDecorateOptionsFn } from 'react-canvas-confetti/dist/types';

export default function Confetti({ direction }: ConfettiProps) {
    const colors = ['#25aae1', '#ffffff', '#f2575b'];
    const options: TDecorateOptionsFn = () => ({ colors: colors, shapes: ['square'], origin: { x: direction === "left" ? -0.2 : 1.2, y: 0.3}, angle: direction === "left" ? 30 : 150, particleCount: 30, startVelocity: 70, spread: 40, ticks: 250 });

    return <Pride autorun={{ speed: 30 }} decorateOptions={options} />;
}