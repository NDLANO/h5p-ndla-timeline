import { TimelineData } from './TimelineData';
import { Translations } from './Translations';

export type Params = TimelineData & {
  behaviour: {
    imageToTextRatio: '40:60' | '50:50';
    scalingMode: 'human' | 'cosmological' | 'index';
  };

  l10n?: Translations;
};
