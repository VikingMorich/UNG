import React, {useState} from 'react';
//import { useTranslation } from "react-i18next"
import ProgressBar from './ProgressBar'
import Modal from './Modal'
import EndBattleModal from './EndBattleModal'
import { inventoryStateOpen, setInventoryStateOpen } from '../fireSubscription'
import { getRandomInt } from '../api/gameFunctions'

export default function UserHud(props) {
    //const [t, i18n] = useTranslation("global");
    const [open, setOpen] = useState(inventoryStateOpen)
    const [type, setType] = useState(inventoryStateOpen ? 'inventory' : '')
    const [endBattle, setEndBattle] = useState(false)
    const [endRes, setEndRes] = useState('')
    const [endReward, setEndReward] = useState(null)
    const toggleModal = () => {
      setOpen(!open)
      setInventoryStateOpen(!open)
      document.body.style.overflow === "hidden" ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden"
    }

    const closeModal = () => {
      setOpen(false)
      setInventoryStateOpen(false)
      document.body.style.overflow = "auto"
    }

    //BATTLE IF

    if (window.location.pathname === '/battle' && props.state.gameStates.HP === 0 && !endBattle) {
      setTimeout(() => {
        setEndBattle(true)
        setEndRes('lose')
      }, 1500)
      
    } else if (window.location.pathname === '/battle' && props.state.gameStates.battle.HP === 0 && !endBattle) {
      setTimeout(() => {
        setEndBattle(true)
        let gold = getRandomInt(props.state.gameStates.battle.maxGold - props.state.gameStates.battle.minGold) + props.state.gameStates.battle.minGold
        setEndReward([{
          type: 'coins',
          name: '* Coins *',
          count: gold
        }, 
        {
          type: 'EXP',
          name: '* Experience *',
          count: props.state.gameStates.battle.EXP
        }])
        setEndRes('win')
      }, 1000)
    }

    const charTy = props.state.gameStates.characterType
    let imgCharacter = charTy === 'archer' ? './faces/archer1.png' : charTy === 'mage' ? './faces/mage1.png' : charTy === 'warrior' ? './faces/warrior1.png' : ''

    return (
        <React.Fragment>
            <div className="user-wrapper">
              <div className='user-img-wrap'>
                <img className="user-img" alt="user-character" src={props.state.gameStates.HP === 0 ? "./low-poly-skull-print.jpg" : imgCharacter} onClick={() => { toggleModal(); setType('character')}}/>
                <div className={`user-lvl ${props.state.gameStates.skillPoints && props.state.gameStates.skillPoints !== 0 && 'update-available'}`} onClick={() => { toggleModal(); setType('skills')}}>
                  <span>{props.state.gameStates.LVL}</span>
                </div>
              </div>
              <div className="user-bars">
                <span className='user-name'>{props.state.username}</span>
                <div className="user-stat">
                  <span className='text-stat'>HP</span>
                  <ProgressBar value={props.state.gameStates.HP} maxValue={props.state.gameStates.maxHP} color='red' />
                </div>
                <div className="user-stat">
                  <span className='text-stat'>EXP</span>
                  <ProgressBar value={props.state.gameStates.EXP} maxValue={props.state.gameStates.maxEXP} color='blue' />
                </div>
                <div className="user-statistics">
                  <div className="char-stat">
                    <span>💪🏻</span>
                    <span>{props.state.gameStates.FUE}</span>
                  </div>
                  <div className="char-stat">
                    <span>🧠</span>
                    <span>{props.state.gameStates.INT}</span>
                  </div>
                  <div className="char-stat">
                    <span>👁️</span>
                    <span>{props.state.gameStates.PUN}</span>
                  </div>
                  <div className="char-stat">
                    <span>🍀</span>
                    <span>{props.state.gameStates.SUE}</span>
                  </div>
                </div>
              </div>
              <div className="stats-char">
                <div className="char-stat">
                  <span>⚔️</span>
                  <span>{props.state.gameStates.ATK}</span>
                </div>
                <div className="char-stat">
                  <span>🛡️</span>
                  <span>{props.state.gameStates.DEF}</span>
                </div>
                <div className="char-stat">
                  <span>💰</span>
                  <span>{props.state.gameStates.gold}</span>
                </div>
                <div className='char-buttons'>
                  <div className="char-inv" onClick={() => { toggleModal(); setType('inventory')}}>
                    <span>🎒</span>
                  </div>
                  <div className="char-inv" onClick={() => { toggleModal(); setType('map')}}>
                    <span>🗺️</span>
                  </div>
                </div>
              </div>
            </div>
            <Modal open={open} toggleModal={() => closeModal()} type={type} state={props.state} />
            <EndBattleModal open={endBattle && !props.state.gameStates.battle.endBattle ? true : false} type={endRes} reward={endReward}/>
        </React.Fragment>
    );
}