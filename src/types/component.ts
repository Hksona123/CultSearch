// src/types/component.ts
import type { ReactNode } from 'react'

export interface BaseProps {
  className?: string
}

export interface WithChildren extends BaseProps {
  children: ReactNode
}

export interface WithLoading extends BaseProps {
  isLoading?: boolean
}

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'ghost' 
  | 'destructive'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type BadgeSize = 'xs' | 'sm' | 'md'
