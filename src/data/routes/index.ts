import type { Route } from '@/lib/schemas/content'
import { ayodhyaRoutes } from './ayodhya'
import { delhiRoutes } from './delhi'
import { gorakhpurRoutes } from './gorakhpur'
import { kathmanduRoutes } from './kathmandu'
import { lucknowRoutes } from './lucknow'
import { raxaulRoutes } from './raxaul'
import { varanasiRoutes } from './varanasi'

export const routes: Route[] = [
  ...gorakhpurRoutes,
  ...raxaulRoutes,
  ...kathmanduRoutes,
  ...ayodhyaRoutes,
  ...varanasiRoutes,
  ...lucknowRoutes,
  ...delhiRoutes,
]
