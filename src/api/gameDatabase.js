export const itemsList = {
  "potions": [
    {
      name: 'health-potion',
      type: 'potion',
      imgSrc: '/items/potion_img.png',
      description: 'health-potion-desc',
      gold: 20,
      sellPrice: 10,
    }
  ],
  "swords": [
    {
      name: 'ultimate-sword',
      type: 'firstHand',
      objType: 'sword',
      stats: {
        ATK: 3,
      },
      stateUsed: 'FUE',
      imgSrc: '/items/ouSkZLD1.png',
      description: 'ultimate-sword-desc',
      gold: 1,
      sellPrice: 10
    }
  ],
  "crossbows": [
    {
      name: 'dwarf-crossbow',
      type: 'firstHand',
      objType: 'crossbow',
      stats: {
        ATK: 3,
      },
      stateUsed: 'PUN',
      imgSrc: '/items/00022-195167288.png',
      description: 'dwarf-crossbow-desc',
      gold: 2,
      sellPrice: 10
    }
  ],
  "spellbooks": [
    {
      name: 'enchanted-book',
      type: 'firstHand',
      objType: 'book',
      stats: {
        ATK: 3,
      },
      stateUsed: 'INT',
      imgSrc: '/items/00027-195167288.png',
      description: 'enchanted-book-desc',
      gold: 3,
      sellPrice: 10
    }
  ],
  "axes": [
    {
      name: 'long-curved-axe',
      type: 'twoHand',
      objType: 'axe',
      stats: {
        ATK: 9,
      },
      stateUsed: 'FUE',
      imgSrc: '/items/00390-3121183695.png',
      description: 'long-curved-axe-desc',
      gold: 50,
      sellPrice: 50
    }
  ],
  "lances": [
    {
      name: 'big-lance',
      type: 'twoHand',
      objType: 'lance',
      stats: {
        ATK: 9,
      },
      stateUsed: 'PUN',
      imgSrc: '/items/00332-3121183697.png',
      description: 'big-lance-desc',
      gold: 50,
      sellPrice: 50
    }
  ],
  "staffs": [
    {
      name: 'long-mage-staff',
      type: 'twoHand',
      objType: 'staff',
      stats: {
        ATK: 9,
      },
      stateUsed: 'INT',
      imgSrc: '/items/00058-195167289.png',
      description: 'long-mage-staff-desc',
      gold: 50,
      sellPrice: 50
    }
  ],
  "shields": [
    {
      name: 'awesome-shield',
      type: 'secondHand',
      objType: 'shield',
      stats: {
        DEF: 2,
      },
      imgSrc: '/items/2_ghnqOu.png',
      description: 'awesome-shield-desc',
      gold: 5,
      sellPrice: 10
    }
  ],
  "knifes": [
    {
      name: 'hunter-knife',
      type: 'secondHand',
      objType: 'knife',
      stats: {
        ATK: 2,
      },
      imgSrc: '/items/00014-811999689.png',
      description: 'hunter-knife-desc',
      gold: 5,
      sellPrice: 10
    }
  ],
  "helmets": [
    {
      name: 'viking-helmet',
      type: 'helmet',
      stats: {
        DEF: 2,
      },
      imgSrc: '/items/TuCiw51n.png',
      description: 'viking-helmet-desc',
      gold: 100,
      sellPrice: 10
    }
  ],
  "armors": [
    {
      name: 'viking-armor',
      type: 'armor',
      stats: {
        DEF: 2,
      },
      imgSrc: '/items/Yk2NS47q.png',
      description: 'viking-armor-desc',
      gold: 100,
      sellPrice: 10
    }
  ],
  "boots": [
    {
      name: 'other-boots',
      type: 'boots',
      stats: {
        DEF: 2,
      },
      imgSrc: '/items/AcxdY7s5.png',
      description: 'other-boots-desc',
      gold: 100,
      sellPrice: 10
    },
    {
      name: 'goblin-boots',
      type: 'boots',
      stats: {
        DEF: 1,
        SPIKES: 1,
      },
      imgSrc: '/items/mf8WgZ6V.png',
      description: 'goblin-boots-desc',
      gold: 100,
      sellPrice: 10
    },
  ],
  "rings": [
    {
      name: 'wedding-ring',
      type: 'ring',
      stats: {
        DEF: 1,
      },
      imgSrc: '/items/LyYP-BzL.png',
      description: 'wedding-ring-desc',
      gold: 100,
      sellPrice: 10
    }
  ],
  "necklaces": [
    {
      name: 'simple-pendant',
      type: 'necklace',
      stats: {
        DEF: 1,
      },
      imgSrc: '/items/00010-105951971.png',
      description: 'simple-pendant-desc',
      gold: 100,
      sellPrice: 10
    }
  ]
}

export const enemiesList = {
  normal: [
    {
      name: 'bird',
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
      name: 'skeleton',
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
      name: 'shark',
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
      name: 'demon',
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
      name: 'werewolf',
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
      name: 'ninja',
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
      name: 'dark-angel',
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
      name: 'dragon',
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
    description: 'Health-desc',
    skillPoints: 1,
    countdown: 0,
    children: [
      {
        name: 'Lucky',
        imgSrc: '',
        description: 'Lucky-desc',
        skillPoints: 1,
        countdown: 0,
        children: [
          {
            name: 'Greedy',
            imgSrc: '',
            description: 'Greedy-desc',
            skillPoints: 1,
            countdown: 0,
          },
          {
            name: 'LuckyII',
            imgSrc: '',
            description: 'LuckyII-desc',
            skillPoints: 1,
            countdown: 0,
          }
        ]
      },
      {
        name: 'HealthII',
        imgSrc: '',
        description: 'HealthII-desc',
        skillPoints: 2,
        countdown: 0,
      },
      {
        name: 'Strength',
        imgSrc: '',
        description: 'Strength-desc',
        skillPoints: 1,
        countdown: 0,
        children: [
          {
            name: 'Brawler',
            imgSrc: '',
            description: 'Brawler-desc',
            skillPoints: 1,
            countdown: 0,
          },
          {
            name: 'StrengthII',
            imgSrc: '',
            description: 'StrengthII-desc',
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
      description: 'Doublestrike-desc',
      skillPoints: 1,
      countdown: 2,
      children: [
        {
          name: 'PowerAttack',
          imgSrc: '',
          description: 'PowerAttack-desc',
          skillPoints: 2,
          countdown: 3,
          children: [
            {
              name: 'Charge',
              imgSrc: '',
              description: 'Charge-desc',
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
      description: 'Health-desc',
      skillPoints: 1,
      countdown: 0,
      children: [
        {
          name: 'Lucky',
          imgSrc: '',
          description: 'Lucky-desc',
          skillPoints: 1,
          countdown: 0,
          children: [
            {
              name: 'Greedy',
              imgSrc: '',
              description: 'Greedy-desc',
              skillPoints: 1,
              countdown: 0,
            },
            {
              name: 'LuckyII',
              imgSrc: '',
              description: 'LuckyII-desc',
              skillPoints: 1,
              countdown: 0,
            }
          ]
        },
        {
          name: 'HealthII',
          imgSrc: '',
          description: 'HealthII-desc',
          skillPoints: 2,
          countdown: 0,
        },
        {
          name: 'Intelectual',
          imgSrc: '',
          description: 'Intelectual-desc',
          skillPoints: 1,
          countdown: 0,
          children: [
            {
              name: 'Brawler',
              imgSrc: '',
              description: 'Brawler-desc',
              skillPoints: 1,
              countdown: 0,
            },
            {
              name: 'IntelectualII',
              imgSrc: '',
              description: 'IntelectualII-desc',
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
      description: 'Fireball-desc',
      skillPoints: 1,
      countdown: 3,
      children: [
        {
          name: 'Rejuvenate',
          imgSrc: '',
          description: 'Rejuvenate-desc',
          skillPoints: 2,
          countdown: 3,
          children: [
            {
              name: 'GhostAttack',
              imgSrc: '',
              description: "GhostAttack-desc",
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
      description: 'Health-desc',
      skillPoints: 1,
      countdown: 0,
      children: [
        {
          name: 'Lucky',
          imgSrc: '',
          description: 'Lucky-desc',
          skillPoints: 1,
          countdown: 0,
          children: [
            {
              name: 'Greedy',
              imgSrc: '',
              description: 'Greedy-desc',
              skillPoints: 1,
              countdown: 0,
            },
            {
              name: 'LuckyII',
              imgSrc: '',
              description: 'LuckyII-desc',
              skillPoints: 1,
              countdown: 0,
            }
          ]
        },
        {
          name: 'HealthII',
          imgSrc: '',
          description: 'HealthII-desc',
          skillPoints: 2,
          countdown: 0,
        },
        {
          name: 'Accurate',
          imgSrc: '',
          description: 'Accurate-desc',
          skillPoints: 1,
          countdown: 0,
          children: [
            {
              name: 'Brawler',
              imgSrc: '',
              description: 'Brawler-desc',
              skillPoints: 1,
              countdown: 0,
            },
            {
              name: 'AccurateII',
              imgSrc: '',
              description: 'AccurateII-desc',
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
      description: 'Headshot-desc',
      skillPoints: 1,
      countdown: 2,
      children: [
        {
          name: 'Multishot',
          imgSrc: '',
          description: 'Multishot-desc',
          skillPoints: 2,
          countdown: 3,
          children: [
            {
              name: 'VampireArrow',
              imgSrc: '',
              description: 'VampireArrow-desc',
              skillPoints: 2,
              countdown: 3,
            }
          ]
        }
      ]
    }
  ]
}