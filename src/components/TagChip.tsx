import type { WeaponTagDefinition } from '../types/character';
import { getTagColor, formatTagLabel, formatTagEffect } from '../data/weaponTags';

interface TagChipProps {
  tag: WeaponTagDefinition;
  x?: number;
  onRemove?: (tagId: string) => void;
  showCategory?: boolean;
  size?: 'sm' | 'md';
}

export function TagChip({ tag, x, onRemove, showCategory = false, size = 'md' }: TagChipProps) {
  const color = getTagColor(tag.category);
  const displayLabel = formatTagLabel(tag, x);
  const displayEffect = formatTagEffect(tag, x);
  const tooltipText = [displayEffect, tag.description].filter(Boolean).join(' — ') || displayLabel;
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <span
      title={tooltipText}
      className={`inline-flex items-center gap-1 rounded-full border ${color.bg} ${color.text} ${color.border} ${sizeClasses} cursor-default`}
    >
      {showCategory && (
        <span className="text-xs opacity-60">{tag.category}</span>
      )}
      <span>{displayLabel}</span>
      {onRemove && (
        <button
          onClick={() => onRemove(tag.id)}
          className="ml-0.5 hover:text-white opacity-60 hover:opacity-100"
          aria-label={`Remove ${displayLabel}`}
        >
          ×
        </button>
      )}
    </span>
  );
}