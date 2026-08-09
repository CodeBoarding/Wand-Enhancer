import { type ReactElement } from 'react';

import type { CheatSchema } from '../../../protocol/messages';
import { ECheatType } from '../../../protocol/messages';
import { ActionButton } from './ActionButton';
import { IncrementalControl } from './IncrementalControl';
import { NumberControl } from './NumberControl';
import { ScalarControl } from './ScalarControl';
import { SelectionControl } from './SelectionControl';
import { SliderControl } from './SliderControl';
import { ToggleControl } from './ToggleControl';
import type { ControlInternalProps } from './shared';

type CheatControlProps = {
  cheat: CheatSchema;
  value: unknown;
  pending: boolean;
  disabled: boolean;
  onChange: (nextValue: unknown) => void;
};

const CONTROL_BY_TYPE: Record<ECheatType, (props: ControlInternalProps) => ReactElement> = {
  [ECheatType.Toggle]: ToggleControl,
  [ECheatType.Slider]: SliderControl,
  [ECheatType.Number]: NumberControl,
  [ECheatType.Button]: ActionButton,
  [ECheatType.Selection]: SelectionControl,
  [ECheatType.Scalar]: ScalarControl,
  [ECheatType.Incremental]: IncrementalControl,
};

export const CheatControl = ({ cheat, value, pending, disabled, onChange }: CheatControlProps) => {
  const Renderer = CONTROL_BY_TYPE[cheat.type];
  if (!Renderer) {
    return <span className="text-[12px] text-red-200">Unsupported: {cheat.type}</span>;
  }

  return <Renderer cheat={cheat} disabled={disabled || pending} value={value} onChange={onChange} />;
};
