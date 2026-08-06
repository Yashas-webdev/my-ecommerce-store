import express from 'express'
import { curateBundle } from '../controllers/aiController.js'

const router = express.Router()

router.post('/curate', curateBundle)

export default router
