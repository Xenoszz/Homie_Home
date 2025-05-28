export function ProgressCircle({ percent, size = 'medium' }) {
  const sizeMap = {
    small: {
      width: 60,
      height: 60,
      strokeWidth: 8,
      fontSize: '16px'
    },
    medium: {
      width: 80,
      height: 80,
      strokeWidth: 10,
      fontSize: '20px'
    },
    large: {
      width: 100,
      height: 100,
      strokeWidth: 12,
      fontSize: '24px'
    }
  };

  const { width, height, strokeWidth, fontSize } = sizeMap[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative" style={{ width, height }}>
      <svg width={width} height={height} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={width / 2}
          cy={height / 2}
        />
        {/* Progress circle */}
        <circle
          className="text-[#58482D] transition-all duration-500 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={width / 2}
          cy={height / 2}
        />
      </svg>
      {/* Percentage text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ fontSize }}
      >
        <span className="font-bold text-[#58482D]">{Math.round(percent)}%</span>
      </div>
    </div>
  );
}
