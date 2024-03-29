import React, {useState} from 'react';
import { useTranslation } from "react-i18next"
import ProgressBar from './ProgressBar'
import Modal from './Modal'
import EndBattleModal from './EndBattleModal'
import { inventoryStateOpen, setInventoryStateOpen } from '../fireSubscription'
import { funcUseBackpackPotion } from '../api/gameFunctions'
import { Potion, BasicAttack, BasicBrain, BasicDex, BasicLuck, BasicMoney, BasicShield, BasicStrength, BasicBackpack, BasicMap } from './icon/icon'
import { Tooltip as ReactTooltip } from 'react-tooltip'

export default function UserHud(props) {
    const [t] = useTranslation("global");
    const [open, setOpen] = useState(inventoryStateOpen)
    const [type, setType] = useState(inventoryStateOpen ? 'inventory' : '')
    const [endBattle, setEndBattle] = useState(false)
    const [endRes, setEndRes] = useState('')
    const computedCompanion = 
      props.state.gameStates.companion === 'boar' ? 'boar.png' : 
      props.state.gameStates.companion === 'eagle' ? 'eagle.png' : 
      props.state.gameStates.companion === 'snake' ? 'snake.png' : 
      props.state.gameStates.companion === 'wolf' ? 'wolf.png' : 
      props.state.gameStates.companion === 'otter' ? 'otter.png' : 
      props.state.gameStates.companion === 'fox' ? 'fox.png' : 
      props.state.gameStates.companion === 'deer' ? 'deer.png' : 'unknown.png'

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
    let potionObj = (props.state.gameStates.backpack && Object.keys(props.state.gameStates.backpack).find(el => props.state.gameStates.backpack[el].name === 'health-potion')) || null

    //BATTLE IF

    if (props.values && props.values.type === 'battle' && props.state.gameStates.HP === 0 && !endBattle) {
      setTimeout(() => {
        setEndBattle(true)
        setEndRes('lose')
      }, 1500)
      
    } else if (props.values && props.values.type === 'battle' && props.state.gameStates.battle.HP === 0 && !endBattle) {
      setTimeout(() => {
        setEndBattle(true)
        setEndRes('win')
      }, 1000)
    }
    const useBackpackPotionFunc = () => {
      funcUseBackpackPotion(potionObj)
    }

    const charTy = props.state.gameStates.characterType
    let imgCharacter = charTy === 'archer' ? './faces/archer1.png' : charTy === 'mage' ? './faces/mage1.png' : charTy === 'warrior' ? './faces/warrior1.png' : ''

    return (
        <React.Fragment>
            <div className="user-wrapper">
              <div className='user-img-wrap'>
                <img className="user-img" alt="user-character" src={props.state.gameStates.HP === 0 ? "./low-poly-skull-print.jpg" : imgCharacter} onClick={() => { toggleModal(); setType('skills')}}/>
                <div className={`user-lvl ${props.state.gameStates.skillPoints && props.state.gameStates.skillPoints !== 0 && 'update-available'}`} onClick={() => { toggleModal(); setType('skills')}} data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.skills')}>
                  <span>{props.state.gameStates.LVL}</span>
                </div>
              </div>
              <div className="user-bars">
                <span className='user-name'>{props.state.username}</span>
                <div className="user-stat">
                  <span className='text-stat'>HP</span>
                  <ProgressBar value={props.state.gameStates.HP} maxValue={props.state.gameStates.maxHP} lastAttack={props.state.gameStates.battle?.lastEnemyDmg || 0} color='red' />
                </div>
                <div className="user-stat">
                  <span className='text-stat'>EXP</span>
                  <ProgressBar value={props.state.gameStates.EXP} maxValue={props.state.gameStates.maxEXP} color='blue' />
                </div>
                <div className="user-statistics">
                  <div className="char-stat" data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.strength')}>
                    <div className='basic-state-icon'>
                      <BasicStrength/>
                    </div>
                    <span>{props.state.gameStates.FUE}</span>
                  </div>
                  <div className="char-stat" data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.inteligence')}>
                    <div className='basic-state-icon'>
                      <BasicBrain/>
                    </div>
                    <span>{props.state.gameStates.INT}</span>
                  </div>
                  <div className="char-stat" data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.dexterity')}>
                    <div className='basic-state-icon'>
                      <BasicDex/>
                    </div>
                    <span>{props.state.gameStates.PUN}</span>
                  </div>
                  <div className="char-stat" data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.luck')}>
                    <div className='basic-state-icon'>
                      <BasicLuck/>
                    </div>
                    <span>{props.state.gameStates.SUE}</span>
                  </div>
                </div>
              </div>
              <div className="stats-char">
                <div className="char-stat" data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.attack')}>
                  <div className='basic-state-icon'>
                    <BasicAttack/>
                  </div>
                  <span>{props.state.gameStates.ATK}</span>
                </div>
                <div className="char-stat" data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.defense')}>
                  <div className='basic-state-icon'>
                    <BasicShield/>
                  </div>
                  <span>{props.state.gameStates.DEF}</span>
                </div>
                <div className="char-stat" data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.gold')}>
                  <div className='basic-state-icon'>
                    <BasicMoney/>
                  </div>
                  <span>{props.state.gameStates.gold}</span>
                </div>
                <div className='char-buttons'>
                  <div className="char-inv" onClick={() => { toggleModal(); setType('inventory')}} data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.inventory')}>
                    <div className='basic-state-icon'>
                      <BasicBackpack/>
                    </div>
                  </div>
                  <div className="char-inv" onClick={() => { toggleModal(); setType('map')}} data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.map')}>
                    <div className='basic-state-icon'>
                      <BasicMap/>
                    </div>
                  </div>
                  {potionObj && 
                    <div className="char-inv" onClick={useBackpackPotionFunc} data-tooltip-id="tooltip-user" data-tooltip-html={t('user-hud.use-potion')}>
                      <div className='basic-state-icon'>
                        <Potion/>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className='companion-img-wrap'>
                <img className="user-img" alt="user-companion" src={`./companions/${computedCompanion}`}/>
              </div>
            </div>
            <ReactTooltip id="tooltip-user" place="top" type="dark" effect="float" className='font-tooltip'/>
            <Modal open={open} toggleModal={() => closeModal()} type={type} state={props.state} />
            <EndBattleModal open={endBattle && !props.state.gameStates.battle.endBattle ? true : false} type={endRes} reward={props.state.gameStates.battle?.battleReward || null} values={props.values} />
        </React.Fragment>
    );
}