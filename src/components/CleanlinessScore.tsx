
import { CSSProperties } from 'react';

interface CleanlinessScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const CleanlinessScore = ({ 
  score, 
  size = 'md', 
  showText = true,
  className = ''
}: CleanlinessScoreProps) => {
  // Calculate colors based on score
  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'from-green-500 to-green-400';
    if (score >= 4.0) return 'from-burgundy-700 to-burgundy-600';
    if (score >= 3.0) return 'from-gold-500 to-gold-400';
    if (score >= 2.0) return 'from-orange-500 to-orange-400';
    return 'from-red-500 to-red-400';
  };

  const getScoreText = (score: number) => {
    if (score >= 4.5) return 'Excellent';
    if (score >= 4.0) return 'Très bon';
    if (score >= 3.0) return 'Bon';
    if (score >= 2.0) return 'Moyen';
    return 'À améliorer';
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'w-12 h-12',
      innerCircle: 'w-10 h-10',
      font: 'text-xl',
      textSize: 'text-xs',
      indicatorSize: 'w-2 h-2'
    },
    md: {
      container: 'w-16 h-16',
      innerCircle: 'w-14 h-14',
      font: 'text-2xl',
      textSize: 'text-sm',
      indicatorSize: 'w-2.5 h-2.5'
    },
    lg: {
      container: 'w-20 h-20',
      innerCircle: 'w-18 h-18',
      font: 'text-3xl',
      textSize: 'text-base',
      indicatorSize: 'w-3 h-3'
    }
  };

  const config = sizeConfig[size];
  const scoreColor = getScoreColor(score);
  const scoreText = getScoreText(score);
  
  // Calculate indicator positions
  const radius = size === 'lg' ? 38 : size === 'md' ? 30 : 22;
  const indicatorCount = 5;
  const scorePercentage = Math.min(score / 5, 1);
  const activeIndicators = Math.round(scorePercentage * indicatorCount);
  
  const getIndicatorPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    return {
      transform: `translate(${x}px, ${y}px)`
    } as CSSProperties;
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${config.container} relative flex items-center justify-center rounded-full bg-gradient-to-b ${scoreColor}`}>
        <div className={`${config.innerCircle} flex items-center justify-center rounded-full bg-white font-bold ${config.font}`}>
          {score.toFixed(1)}
        </div>
        
        {/* Indicators */}
        {Array.from({ length: indicatorCount }).map((_, index) => (
          <div 
            key={index}
            className={`absolute ${config.indicatorSize} rounded-full ${
              index < activeIndicators ? 'bg-white' : 'bg-white/30'
            }`}
            style={getIndicatorPosition(index, indicatorCount)}
          />
        ))}
      </div>
      
      {showText && (
        <div className="mt-2 text-center">
          <p className={`font-medium ${config.textSize}`}>{scoreText}</p>
        </div>
      )}
    </div>
  );
};

export default CleanlinessScore;
