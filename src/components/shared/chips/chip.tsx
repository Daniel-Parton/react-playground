import React from "react";
import classNames from "classnames";
import { IconType } from "react-icons";
import { FaTimes } from "react-icons/fa";

export interface ChipProps {
  className?: string
  icon?: IconType
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info'
  small?: boolean
  label: string
  onDelete?: (label: string) => void
}

export function toChipProps<T = any>(array: T[], predicate?: (data: T) => string): ChipProps[] {
  if (!array) return [] as ChipProps[]

  return array.map<ChipProps>(x => {
    const chip: ChipProps = { label: x as any };
    if (predicate) chip.label = predicate(x);
    return chip
  });

}

const Chip: React.FC<ChipProps> = (props) => {

  const { className, icon, label, onDelete, small, variant, ...rest } = props;

  const classes = classNames({
    'chip': true,
    'chip-small': small,
    'chip-danger': variant === 'danger',
    'chip-info': variant === 'info',
    'chip-warning': variant === 'warning',
    'chip-success': variant === 'success',
    [className!]: className !== undefined,
  });

  const Icon = icon;
  return (
    <div className={classes} {...rest}>
      {Icon && <Icon />}
      <span className='chip-icon-label'>{label}</span>
      {onDelete && <FaTimes className='chip-delete-icon' onClick={() => onDelete(label)} />}
    </div>
  )
};

export default Chip;