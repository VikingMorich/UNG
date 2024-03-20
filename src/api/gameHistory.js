export const history = {
  page0: {
    type: 'character-sel'
  },
  // page0: {
  //   type: 'text',
  //   text: ['Las grandes almas tienen voluntades; las débiles tan solo deseos. Algunos me conocen como Ragnaros, ve y encuentra tu camino...', 'Rotate inmersion...'],
  //   choices: [{name: 'Continuar', history: 'page1'}],
  //   no_user_hud: true,
  // },
  page1: {
    type: 'talk',
    character: 'guard1',
    location: 'forest1',
    text: ['Me cago en la ostia... Ehhh tu... ¿Estas bien?', 'No me lo puedo creer, parece que aun respira... AAAAAAH!!!', '...', '¿Pero que ha pasado tio, como has hecho esto?'],
    choices: [{name: '¿Hacer que?', history: 'page2'}, {name: '¿Quien eres tu?', history: 'page2'}, {name: 'Soy el mesias, he venido a salvaros', history: 'page3'}]
  },
  page2: {
    type: 'talk',
    character: 'guard1',
    location: 'forest1',
    text: ['Ay perdona, no me he presentado, soy X? un vigilante de la isla Y, estaba fumando tranquilamente en la torre y de repente empece a ver como un remolino purpura oscuro en el cielo y me empece a rallar...', 
    'Me habran vuelto a vender hierba xunga... esos cabrones no saben con quien se estan metiendo... y de pronto hizo un destello y te vi caer del cielo hasta aqui cerca. Te segui y justo acabamos de encontrarnos. ¿Te encuentras bien?'],
    choices: [{name: 'Si', history: 'page10'}, {name: 'He tenido dias mejores', history: 'page11'}]
  },
  page3: {
    type: 'talk',
    character: 'guard1',
    location: 'forest1',
    text: ['Genial, empecemos por dejar el cielo como estaba entonces :D'],
    choices: [{name: 'No se como hacer eso...', history: 'page2'}]
  },
  page11: {
    type: 'talk',
    character: 'guard1',
    location: 'forest1',
    text: ['Jajaja ya imagino. ¿Como te llamas?'],
    choices: [{name: 'Continuar', history: 'page4'}]
  },
  page10: {
    type: 'talk',
    character: 'guard1',
    location: 'forest1',
    text: ['Increible después de ese golpe... ¿Como te llamas?'],
    choices: [{name: 'Continuar', history: 'page4'}]
  },
  page4: {
    type: 'name',
    choices: [{name: 'Continuar', history: 'page5'}]
  },
  page5: {
    type: 'book',
    text: ['Lorem ipsum', 'Img with text', 'easy peasy'],
    resources: [{type: 'img', slide: 1, src: 'locations/village1.jpeg'}],
    choices: [{name: 'ok', history: 'page6'}, {name: 'no', history: 'page6'}]
  },
  // page6: {
  //   type: 'battle',
  //   enemy: {name: 'Bird', type: 'normal'},
  //   win: 'page7'
  // },
  // page7: {
  //   type: 'shop',
  //   items: [{count: 2, name: '* Health potion *'}],
  //   end: 'page8'
  // }
}