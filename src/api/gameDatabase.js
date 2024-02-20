export const itemsList = {
  "boots": [
    {
      name: '* Other boots *',
      type: 'boots',
      stats: {
        DEF: 2,
      },
      imgSrc: '/items/AcxdY7s5.png',
      count: 1,
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
      gold: 100,
      sellPrice: 10
    },
  ],
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
      gold: 100,
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
      gold: 100,
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
      gold: 100,
      sellPrice: 10
    }
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
      gold: 100,
      sellPrice: 10
    }
  ]
  // "consumable": [
  //   {
  //     name: '*Piedra afilar *',
  //     type: 'rock',
  //     count: 1
  //   }
  // ]
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
    //obj amb chance?
    FUE: 70
  }
]