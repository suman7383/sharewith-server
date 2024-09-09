import config from './config/config'

import { app } from './app'
import logger from './utils/logger'

app.listen(config.PORT || 5000, () => {
    logger.info(`Server Started`, {
        meta: {
            PORT: config.PORT,
            ENV: config.ENV
        }
    })
})
