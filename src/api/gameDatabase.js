export const itemsList = {
  "potions": [
    {
      name: '* Health potion *',
      type: 'potion',
      imgSrc: '/items/potion_img.png',
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
      description: 'description',
      gold: 100,
      sellPrice: 10
    }
  ]
}

export const enemiesList = {
  normal: [
    {
      name: 'Bird',
      imgSrc: '/enemies/bird.png',
      HP: 40,
      maxHP: 40,
      DEF: 1,
      ATK: 3,
      EXP: 50,
      maxGold: 50,
      minGold: 30,
      //obj amb chance de q surti?
      FUE: 60
    },
    {
      name: 'Skeleton',
      imgSrc: '/enemies/skeleton.png',
      HP: 50,
      maxHP: 50,
      DEF: 2,
      ATK: 6,
      EXP: 100,
      maxGold: 50,
      minGold: 30,
      //obj amb chance de q surti?
      FUE: 40
    },
    {
      name: 'Shark',
      imgSrc: '/enemies/shark.jpeg',
      HP: 45,
      maxHP: 45,
      DEF: 1,
      ATK: 6,
      EXP: 250,
      maxGold: 300,
      minGold: 200,
      //obj amb chance de q surti?
      FUE: 65
    },
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
      HP: 80,
      maxHP: 80,
      DEF: 3,
      ATK: 5,
      EXP: 400,
      maxGold: 300,
      minGold: 200,
      //obj amb chance de q surti?
      FUE: 75
    }
  ],
  hard: [
    {
      name: 'Ninja',
      imgSrc: '/enemies/ninja.png',
      HP: 150,
      maxHP: 150,
      DEF: 8,
      ATK: 5,
      EXP: 1200,
      maxGold: 2000,
      minGold: 500,
      //obj amb chance de q surti?
      FUE: 60
    },
    {
      name: 'Dark Angel',
      imgSrc: '/enemies/darkangel.png',
      HP: 200,
      maxHP: 200,
      DEF: 8,
      ATK: 6,
      EXP: 1500,
      maxGold: 2000,
      minGold: 500,
      //obj amb chance de q surti?
      FUE: 70
    },
    {
      name: 'Dragon',
      imgSrc: '/enemies/dragon.jpeg',
      HP: 250,
      maxHP: 250,
      DEF: 7,
      ATK: 10,
      EXP: 2000,
      maxGold: 3000,
      minGold: 200,
      //obj amb chance de q surti?
      FUE: 85
    }
  ]
}

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
        children: [
          {
            name: 'Greedy',
            imgSrc: '',
            description: '+5% multiplier in gold rewards',
            skillPoints: 1,
            countdown: 0,
          },
          {
            name: 'Lucky II',
            imgSrc: '',
            description: 'Increase your 🍀 by 5 permanently',
            skillPoints: 1,
            countdown: 0,
          }
        ]
      },
      {
        name: 'Health II',
        imgSrc: '',
        description: 'Increase your max HP by 40 permanently',
        skillPoints: 2,
        countdown: 0,
      },
      {
        name: 'Strength',
        imgSrc: '',
        description: 'Increase your 💪🏻 by 3 permanently',
        skillPoints: 1,
        countdown: 0,
        children: [
          {
            name: 'Brawler',
            imgSrc: '',
            description: 'Increase your ⚔️ and 🛡️ by 1 permanently',
            skillPoints: 1,
            countdown: 0,
          },
          {
            name: 'Strength II',
            imgSrc: '',
            description: 'Increase your 💪🏻 by 5 permanently',
            skillPoints: 1,
            countdown: 0,
          }
        ]
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
          name: 'PowerAttack',
          imgSrc: '',
          description: 'Add +2 dices to your attack',
          skillPoints: 2,
          countdown: 3,
          children: [
            {
              name: 'Charge',
              imgSrc: '',
              description: 'Attack the enemt, if you get the full </br>combo of hits, add stunned to the enemy',
              skillPoints: 2,
              countdown: 3,
            }
          ]
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
          children: [
            {
              name: 'Greedy',
              imgSrc: '',
              description: '+5% multiplier in gold rewards',
              skillPoints: 1,
              countdown: 0,
            },
            {
              name: 'Lucky II',
              imgSrc: '',
              description: 'Increase your 🍀 by 5 permanently',
              skillPoints: 1,
              countdown: 0,
            }
          ]
        },
        {
          name: 'Health II',
          imgSrc: '',
          description: 'Increase your max HP by 40 permanently',
          skillPoints: 2,
          countdown: 0,
        },
        {
          name: 'Intelectual',
          imgSrc: '',
          description: 'Increase your 🧠 by 3 permanently',
          skillPoints: 1,
          countdown: 0,
          children: [
            {
              name: 'Brawler',
              imgSrc: '',
              description: 'Increase your ⚔️ and 🛡️ by 1 permanently',
              skillPoints: 1,
              countdown: 0,
            },
            {
              name: 'Intelectual II',
              imgSrc: '',
              description: 'Increase your 🧠 by 5 permanently',
              skillPoints: 1,
              countdown: 0,
            }
          ]
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
      countdown: 3,
      children: [
        {
          name: 'Rejuvenate',
          imgSrc: '',
          description: 'Restore 15HP in combat',
          skillPoints: 2,
          countdown: 3,
          children: [
            {
              name: 'Ghost attack',
              imgSrc: '',
              description: "Remove the value of the first enemy's dice </br>when you use this attack",
              skillPoints: 2,
              countdown: 3,
              
            }
          ]
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
          children: [
            {
              name: 'Greedy',
              imgSrc: '',
              description: '+5% multiplier in gold rewards',
              skillPoints: 1,
              countdown: 0,
            },
            {
              name: 'Lucky II',
              imgSrc: '',
              description: 'Increase your 🍀 by 5 permanently',
              skillPoints: 1,
              countdown: 0,
            }
          ]
        },
        {
          name: 'Health II',
          imgSrc: '',
          description: 'Increase your max HP by 40 permanently',
          skillPoints: 2,
          countdown: 0,
        },
        {
          name: 'Accurate',
          imgSrc: '',
          description: 'Increase your 👁️ by 3 permanently',
          skillPoints: 1,
          countdown: 0,
          children: [
            {
              name: 'Brawler',
              imgSrc: '',
              description: 'Increase your ⚔️ and 🛡️ by 1 permanently',
              skillPoints: 1,
              countdown: 0,
            },
            {
              name: 'Accurate II',
              imgSrc: '',
              description: 'Increase your 👁️ by 5 permanently',
              skillPoints: 1,
              countdown: 0,
            }
          ]
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
          description: 'Decrease your 👁️ by 15 but triplicate your dmg',
          skillPoints: 2,
          countdown: 3,
          children: [
            {
              name: 'Vampire arrow',
              imgSrc: '',
              description: 'The amount of overkill to the enemy heals the player',
              skillPoints: 2,
              countdown: 3,
            }
          ]
        }
      ]
    }
  ]
}