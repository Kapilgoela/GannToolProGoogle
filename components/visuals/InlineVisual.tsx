import React from 'react';
import { Visual } from '../../types';
import GannFanVisual from './GannFanVisual';
import GannSquareOf9Visual from './GannSquareOf9Visual';
import GannSwingChartVisual from './GannSwingChartVisual';
import GannWheelVisual from './GannWheelVisual';
import GannAngle1x1Visual from './GannAngle1x1Visual';
import GannEmblemVisual from './GannEmblemVisual';
import GannGridOverlayVisual from './GannGridOverlayVisual';
import GannDateTimePredictorVisual from './GannDateTimePredictorVisual';

interface InlineVisualProps {
    visual: Visual;
}

export const InlineVisual: React.FC<InlineVisualProps> = ({ visual }) => {
    const renderVisual = () => {
        if (!visual || !visual.data) {
            return <div className="text-center text-gray-500">Visual data is not available.</div>;
        }

        switch (visual.type) {
            case 'SQUARE_OF_9':
                return <GannSquareOf9Visual centerValue={visual.data.center ?? 100} size={visual.data.size ?? 5} />;
            case 'GANN_FAN':
                return <GannFanVisual prices={visual.data.prices ?? []} />;
            case 'SWING_CHART':
                return <GannSwingChartVisual prices={visual.data.prices ?? []} reversalBars={3} />;
            case 'GANN_WHEEL':
                 return <GannWheelVisual centerValue={visual.data.center ?? 100} />;
            case 'GANN_ANGLE_1X1':
                return <GannAngle1x1Visual />;
            case 'GANN_GRID':
                return <GannGridOverlayVisual high={visual.data.high ?? 120} low={visual.data.low ?? 100} />;
            case 'GANN_EMBLEM':
                return <GannEmblemVisual />;
            case 'GANN_DATE_PREDICTOR':
                return <GannDateTimePredictorVisual startDate={visual.data.startDate ?? new Date().toISOString().split('T')[0]} />;
            default:
                 return <GannSwingChartVisual prices={[10,15,12,18,16,22,20,25]} reversalBars={2} />;
        }
    };

    return (
        <figure className="my-8">
            <div className="aspect-video w-full rounded-lg border bg-slate-50 shadow-sm overflow-hidden p-2">
                {renderVisual()}
            </div>
            <figcaption className="text-center text-sm text-gray-500 mt-2 italic">{visual.caption}</figcaption>
        </figure>
    );
};