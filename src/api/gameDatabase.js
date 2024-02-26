export const itemsList = {
  "swords": [
    {
      name: '* Ultimate sword *',
      type: 'firstHand',
      objType: 'sword',
      stats: {
        ATK: 3,
      },
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
      imgSrc: '/items/00027-195167288.png',
      count: 1,
      description: 'description',
      gold: 3,
      sellPrice: 10
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
  }
]

export const skillsWarrior = [
  {
    name: 'Doublestrike',
    imgSrc: '',
    description: 'New attack: double the damage of the next attack',
    skillPoints: 1,
    countdown: 2,
    children: [
      {
        name: 'Strength',
        imgSrc: '',
        description: 'Increase your 💪🏻 by 3 permanently',
        skillPoints: 1,
        countdown: 0,
      }
    ]
  }
]

export const skillsMage = [
  {
    name: 'Rejuvenate',
    imgSrc: '',
    description: 'New attack: restore 15HP in combat',
    skillPoints: 1,
    countdown: 2,
    children: [
      {
        name: 'Intelectual',
        imgSrc: '',
        description: 'Increase your 🧠 by 3 permanently',
        skillPoints: 1,
        countdown: 0,
      }
    ]
  }
]

export const skillsArcher = [
  {
    name: 'Headshot',
    imgSrc: '',
    description: 'New attack: Critical hit 150% dmg',
    skillPoints: 1,
    countdown: 2,
    children: [
      {
        name: 'Accurate',
        imgSrc: '',
        description: 'Increase your 👁️ by 3 permanently',
        skillPoints: 1,
        countdown: 0,
      }
    ]
  }
]