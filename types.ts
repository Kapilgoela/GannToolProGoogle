import React from 'react';

export interface GannTool {
  slug: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  component: React.FC;
  tags: string[];
}

export interface Visual {
  type: 'SQUARE_OF_9' | 'GANN_FAN' | 'SWING_CHART' | 'GANN_WHEEL' | 'GANN_ANGLE_1X1' | 'GANN_GRID' | 'GANN_EMBLEM' | 'GANN_DATE_PREDICTOR';
  caption: string;
  data: { [key: string]: any }; 
}

export interface BlogPost {
  title: string;
  metaDescription: string;
  introduction: string;
  sections: { 
    heading: string; 
    content: string;
    visual?: Visual;
  }[];
  conclusion: string;
  externalLinks: { title: string; url: string }[];
}

export type IndicatorTag = 'Trend' | 'Momentum' | 'Volume' | 'Volatility' | 'Support/Resistance' | 'Pattern' | 'Custom';

export interface TradingViewIndicator {
  slug: string;
  name: string;
  description: string;
  tags: IndicatorTag[];
  categorySlug: string;
}

export interface TradingViewCategory {
    slug: string;
    name: string;
    description: string;
    icon: React.FC<{ className?: string }>;
}