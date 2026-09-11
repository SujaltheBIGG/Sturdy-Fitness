import type { BadgeType } from '../types'

export interface BadgeDefinition {
  icon: string
  label: string
  description: string
  oneTime: boolean
}

export const BADGE_DEFINITIONS: Record<BadgeType, BadgeDefinition> = {
  first_a: {
    icon: '\u2B50',
    label: 'First A',
    description: 'Your first meal with an A score',
    oneTime: true,
  },
  streak_3: {
    icon: '\uD83D\uDD25',
    label: '3-day streak',
    description: '3 days in a row scoring A or B',
    oneTime: false,
  },
  streak_7: {
    icon: '\uD83D\uDD25',
    label: '7-day streak',
    description: '7 days in a row scoring A or B',
    oneTime: false,
  },
  streak_30: {
    icon: '\uD83C\uDFC6',
    label: '30-day streak',
    description: '30 days in a row scoring A or B',
    oneTime: false,
  },
  weekly_improvement: {
    icon: '\u2B06\uFE0F',
    label: 'Weekly improvement',
    description: 'Your weekly score improved on the week before',
    oneTime: false,
  },
  no_e_week: {
    icon: '\uD83D\uDEE1\uFE0F',
    label: 'Clean week',
    description: 'A full week with no meal scoring E',
    oneTime: false,
  },
  balanced_day: {
    icon: '\uD83D\uDC51',
    label: 'Perfect day',
    description: 'A day with every meal scoring A or B',
    oneTime: false,
  },
  comeback: {
    icon: '\uD83D\uDE80',
    label: 'Comeback',
    description: 'You went from a D/E week to an A/B/C week',
    oneTime: false,
  },
}
