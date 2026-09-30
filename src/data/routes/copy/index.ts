import type { RouteCopy } from './types'
import { routeCopy as gorakhpur_up } from './gorakhpur-up'
import { routeCopy as gorakhpur_east } from './gorakhpur-east'
import { routeCopy as nepal } from './nepal'
import { routeCopy as others } from './others'

export type { RouteCopy }

export const routeCopy: Record<string, RouteCopy> = {
  ...gorakhpur_up,
  ...gorakhpur_east,
  ...nepal,
  ...others,
}
