import express from 'express'
import { createNeasEntradas, deleteNeasEntradas, getNeaEntradas, getNeaEntradasId, updateNeasEntradas } from '../controllers/NeaEntradas.js'

const router = express.Router()

router.get('/', getNeaEntradas)
router.get('/:id', getNeaEntradasId)
router.post('/', createNeasEntradas)
router.put('/:id', updateNeasEntradas)
router.delete('/:id', deleteNeasEntradas)
export default router