import VWave from 'v-wave'
import type { UserModule } from '@/types'

export const install: UserModule = ({ app }) => {
  app.use(VWave)
}
