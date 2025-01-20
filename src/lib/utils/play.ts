import { MAX_PICK_NUMS } from "@/common/statement/common"
import { CFNBetsType } from "@/redux/predictoorDetail/reducer"
import { PlayEventItem, CFNGuess } from "@/service/play/interface"

export const hasGuess = (item: CFNBetsType) => {
  return [-1, 1].includes(item.guess as any)
}

export const allHasGuess = (bets: CFNBetsType) => {
  return Object.keys(bets).length === MAX_PICK_NUMS
}

export const getGuessData = (item: PlayEventItem, bet: CFNGuess | null) => {
  if (bet === null) {
    return null
  }
  const key = bet === 1? 'right' : 'left';
  return item[key]
}