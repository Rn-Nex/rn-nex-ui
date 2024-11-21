import { ColorValue, StyleProp, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { BaseButtonProps } from '../Button/Button.types';
import { VariantTypes } from '../../utils';

/**
 * Defines the variant of the chip.
 */
export type ChipVariant = 'outlined' | 'filled';
/**
 * Defines the color variations available for the chip.
 */
export interface ChipProps extends Omit<BaseButtonProps, 'children' | 'sx'> {
  /**
   * The label text to display inside the chip.
   */
  label?: string;
  /**
   * The variant of the chip, either 'outlined' or 'filled'.
   */
  variant?: ChipVariant;
  /**
   * The color variation of the chip.
   */
  color?: VariantTypes;
  /**
   * Styles for the chip wrapper container.
   */
  chipWrapperContainerStyles?: StyleProp<ViewStyle>;
  /**
   * Change the border radius of the chip component.
   */
  square?: boolean;
  /**
   * Used for change the label color
   */
  labelColor?: ColorValue;
  /**
   * Implies that the border and text colors are synchronized.
   */
  syncBorderAndLabelColor?: boolean;
}
export interface GenerateChipStylesProps extends Pick<ChipProps, 'variant' | 'disabled' | 'color'> {
  theme: ThemeType;
}
export interface LabelStylesInterface extends Pick<ChipProps, 'labelColor' | 'color' | 'syncBorderAndLabelColor'> {
  isOutlinedVariant: boolean;
  theme: ThemeType;
}
