/** @format */

export default function Animated404() {
  return (
    <svg
      className='lg:w-28 lg:h-28 w-full h-20'
      viewBox='0 0 100 70'
      xmlns='http://www.w3.org/2000/svg'>
      <style>
        {`
          .number { 
            font-size: 40px;
            font-weight: bold;
            fill: none;
            stroke: hsl(var(--primary));
            stroke-width: 2;
            stroke-linejoin: round;
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: draw 2s linear forwards;
          }

          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      <text x='10' y='50' className='number'>
        4
      </text>
      <text x='40' y='50' className='number'>
        0
      </text>
      <text x='70' y='50' className='number'>
        4
      </text>
    </svg>
  );
}
