'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface AppIconProps {
  name: string;
  size?: number | string;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap = LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>;

export default function AppIcon({ name, size = 20, className = '' }: AppIconProps) {
  // Strip trailing 'Icon' if present (e.g. 'ArrowLeftIcon' -> 'ArrowLeft')
  const cleanName = name.replace(/Icon$/, '');

  const IconComponent = iconMap[cleanName] || iconMap[name] || LucideIcons.HelpCircle;

  return <IconComponent size={size} className={className} />;
}
