export const itemsList = {
  "potions": [
    {
      name: '* Health potion *',
      type: 'potion',
      imgSrc: '/items/potion_img.png',
      count: 1,
      description: 'description',
      gold: 20,
      sellPrice: 10,
      stats: {
        use: 'Restore 20HP',
      },
    }
  ],
  "swords": [
    {
      name: '* Ultimate sword *',
      type: 'firstHand',
      objType: 'sword',
      stats: {
        ATK: 3,
      },
      stateUsed: 'FUE',
      imgSrc: '/items/ouSkZLD1.png',
      count: 1,
      description: 'description',
      gold: 1,
      sellPrice: 10
    }
  ],
  "crossbows": [
    {
      name: '* Dwarf crossbow *',
      type: 'firstHand',
      objType: 'crossbow',
      stats: {
        ATK: 3,
      },
      stateUsed: 'PUN',
      imgSrc: '/items/00022-195167288.png',
      count: 1,
      description: 'description',
      gold: 2,
      sellPrice: 10
    }
  ],
  "spellbooks": [
    {
      name: '* Enchanted book *',
      type: 'firstHand',
      objType: 'book',
      stats: {
        ATK: 3,
      },
      stateUsed: 'INT',
      imgSrc: '/items/00027-195167288.png',
      count: 1,
      description: 'description',
      gold: 3,
      sellPrice: 10
    }
  ],
  "axes": [
    {
      name: '* Long curved axe *',
      type: 'twoHand',
      objType: 'axe',
      stats: {
        ATK: 9,
      },
      stateUsed: 'FUE',
      imgSrc: '/items/00390-3121183695.png',
      count: 1,
      description: 'description',
      gold: 50,
      sellPrice: 50
    }
  ],
  "lances": [
    {
      name: '* Big lance *',
      type: 'twoHand',
      objType: 'lance',
      stats: {
        ATK: 9,
      },
      stateUsed: 'PUN',
      imgSrc: '/items/00332-3121183697.png',
      count: 1,
      description: 'description',
      gold: 50,
      sellPrice: 50
    }
  ],
  "staffs": [
    {
      name: '* Long mage staff *',
      type: 'twoHand',
      objType: 'staff',
      stats: {
        ATK: 9,
      },
      stateUsed: 'INT',
      imgSrc: '/items/00058-195167289.png',
      count: 1,
      description: 'description',
      gold: 50,
      sellPrice: 50
    }
  ],
  "shields": [
    {
      name: '* Some shield *',
      type: 'secondHand',
      objType: 'shield',
      stats: {
        DEF: 2,
      },
      imgSrc: '/items/2_ghnqOu.png',
      count: 1,
      description: 'description',
      gold: 5,
      sellPrice: 10
    }
  ],
  "knifes": [
    {
      name: '* Hunter knife *',
      type: 'secondHand',
      objType: 'knife',
      stats: {
        ATK: 2,
      },
      imgSrc: '/items/00014-811999689.png',
      count: 1,
      description: 'description',
      gold: 5,
      sellPrice: 10
    }
  ],
  "helmets": [
    {
      name: '* Viking helmet *',
      type: 'helmet',
      stats: {
        DEF: 2,
      },
      imgSrc: '/items/TuCiw51n.png',
      count: 1,
      description: 'description',
      gold: 100,
      sellPrice: 10
    }
  ],
  "armors": [
    {
      name: '* Viking armor *',
      type: 'armor',
      stats: {
        DEF: 2,
      },
      imgSrc: '/items/Yk2NS47q.png',
      count: 1,
      description: 'description',
      gold: 100,
      sellPrice: 10
    }
  ],
  "boots": [
    {
      name: '* Other boots *',
      type: 'boots',
      stats: {
        DEF: 2,
      },
      imgSrc: '/items/AcxdY7s5.png',
      count: 1,
      description: 'description',
      gold: 100,
      sellPrice: 10
    },
    {
      name: '* Goblin boots *',
      type: 'boots',
      stats: {
        DEF: 1,
        SPIKES: 1,
      },
      imgSrc: '/items/mf8WgZ6V.png',
      count: 1,
      description: 'description',
      gold: 100,
      sellPrice: 10
    },
  ],
  "rings": [
    {
      name: '* Wedding ring *',
      type: 'ring',
      stats: {
        DEF: 1,
      },
      imgSrc: '/items/LyYP-BzL.png',
      count: 1,
      description: 'description',
      gold: 100,
      sellPrice: 10
    }
  ],
  "necklaces": [
    {
      name: '* Simple Pendant *',
      type: 'necklace',
      stats: {
        DEF: 1,
      },
      imgSrc: '/items/00010-105951971.png',
      count: 1,
      description: 'description',
      gold: 100,
      sellPrice: 10
    }
  ]
}

export const enemiesList = [
  {
    name: 'Demon',
    imgSrc: '/enemies/demon.jpeg',
    HP: 50,
    maxHP: 50,
    DEF: 1,
    ATK: 3,
    EXP: 250,
    maxGold: 300,
    minGold: 200,
    //obj amb chance de q surti?
    FUE: 70
  },
  {
    name: 'Werewolf',
    imgSrc: '/enemies/werewolf.png',
    HP: 75,
    maxHP: 75,
    DEF: 3,
    ATK: 5,
    EXP: 300,
    maxGold: 300,
    minGold: 200,
    //obj amb chance de q surti?
    FUE: 75
  }
]

export const skillsWarrior = {
  pasives: [
  {
    name: 'Health',
    imgSrc: '',
    description: 'Increase your max HP by 10 permanently',
    skillPoints: 1,
    countdown: 0,
    children: [
      {
        name: 'Lucky',
        imgSrc: '',
        description: 'Increase your 🍀 by 3 permanently',
        skillPoints: 1,
        countdown: 0,
      },
      {
        name: 'Strength',
        imgSrc: '',
        description: 'Increase your 💪🏻 by 3 permanently',
        skillPoints: 1,
        countdown: 0,
      }
    ]
  }
  ],
  combat: [
    {
      name: 'Doublestrike',
      imgSrc: '',
      description: 'Double the damage of the next attack',
      skillPoints: 1,
      countdown: 2,
      children: [
        {
          name: 'PowerAttak',
          imgSrc: '',
          description: 'Add +2 dices to your attack',
          skillPoints: 2,
          countdown: 3,
        }
      ]
    }
  ],
}

export const skillsMage = {
  pasives: [
    {
      name: 'Health',
      imgSrc: '',
      description: 'Increase your max HP by 10 permanently',
      skillPoints: 1,
      countdown: 0,
      children: [
        {
          name: 'Lucky',
          imgSrc: '',
          description: 'Increase your 🍀 by 3 permanently',
          skillPoints: 1,
          countdown: 0,
        },
        {
          name: 'Intelectual',
          imgSrc: '',
          description: 'Increase your 🧠 by 3 permanently',
          skillPoints: 1,
          countdown: 0,
        }
      ]
    }
  ],
  combat: [
    {
      name: 'Fireball',
      imgSrc: '',
      description: 'Increase your 🧠 by 5 if you get </br>the full combo of hits add Burned to the enemy',
      skillPoints: 1,
      countdown: 2,
      children: [
        {
          name: 'Rejuvenate',
          imgSrc: '',
          description: 'Restore 10HP in combat',
          skillPoints: 2,
          countdown: 3,
        }
      ]
    }
  ],
}

export const skillsArcher = {
  pasives: [
    {
      name: 'Health',
      imgSrc: '',
      description: 'Increase your max HP by 10 permanently',
      skillPoints: 1,
      countdown: 0,
      children: [
        {
          name: 'Lucky',
          imgSrc: '',
          description: 'Increase your 🍀 by 3 permanently',
          skillPoints: 1,
          countdown: 0,
        },
        {
          name: 'Accurate',
          imgSrc: '',
          description: 'Increase your 👁️ by 3 permanently',
          skillPoints: 1,
          countdown: 0,
        }
      ]
    }
  ],
  combat: [
    {
      name: 'Headshot',
      imgSrc: '',
      description: 'Ignore enemy defense and +1 dice to roll',
      skillPoints: 1,
      countdown: 2,
      children: [
        {
          name: 'Multishot',
          imgSrc: '',
          description: 'Decrease your 👁️ by 20 but triplicate your dmg',
          skillPoints: 2,
          countdown: 3,
        }
      ]
    }
  ]
}