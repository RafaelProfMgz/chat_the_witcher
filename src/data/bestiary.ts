export interface Monster {
  id: string;
  name: string;
  category: MonsterCategory;
  description: string;
  weaknesses: {
    signs: string[];
    oils: string[];
    bombs: string[];
  };
  difficulty: 1 | 2 | 3 | 4 | 5;
  locations: string[];
  tip: string;
}

export type MonsterCategory =
  | "Relictos"
  | "Espectros"
  | "Vampiros"
  | "Insectóides"
  | "Necrófalos"
  | "Draconídeos"
  | "Híbridos"
  | "Bestas Amaldiçoadas"
  | "Elementais"
  | "Ogróides";

export const MONSTER_CATEGORIES: MonsterCategory[] = [
  "Relictos",
  "Espectros",
  "Vampiros",
  "Insectóides",
  "Necrófalos",
  "Draconídeos",
  "Híbridos",
  "Bestas Amaldiçoadas",
  "Elementais",
  "Ogróides",
];

export const BESTIARY: Monster[] = [
  {
    id: "grifino",
    name: "Grifino",
    category: "Híbridos",
    description:
      "Os grifinos são criaturas majestosas e territoriais, metade águia e metade leão, que habitam montanhas e colinas elevadas. Atacam com garras afiadas e mergulhos aéreos devastadores. São extremamente protetores de seus ninhos e não hesitam em atacar qualquer intruso que se aproxime.",
    weaknesses: {
      signs: ["Aard", "Igni"],
      oils: ["Óleo de Híbrido"],
      bombs: ["Bomba de Fragmentação"],
    },
    difficulty: 2,
    locations: ["Jardim Branco", "Velen", "Skellige"],
    tip: "Quando o grifino levantar voo, prepare-se para rolar para o lado. Use Aard quando ele mergulhar — isso o derruba e abre uma janela para ataques pesados. Não fique parado, rapaz, ou será comida de grifo.",
  },
  {
    id: "draugir",
    name: "Draugir",
    category: "Necrófalos",
    description:
      "Os draugires são mortos-vivos que se erguem de sepulturas profanadas e campos de batalha esquecidos. Mais fortes que necrófagos comuns, usam armaduras enferrujadas e armas antigas. Seu ódio pelos vivos é tão intenso que continuam lutando mesmo com membros decepados.",
    weaknesses: {
      signs: ["Igni", "Quen"],
      oils: ["Óleo de Necrófalos"],
      bombs: ["Lua Negra"],
    },
    difficulty: 2,
    locations: ["Velen", "Skellige", "Cemitério de Crookback Bog"],
    tip: "Draugires são teimosos — continuam atacando mesmo quando deveriam estar mortos de novo. Igni é teu melhor amigo aqui: o fogo os atordoa e interrompe suas investidas. Mantenha Quen ativo caso erre o tempo do esquive.",
  },
  {
    id: "diaba-do-meio-dia",
    name: "Diaba do Meio-dia",
    category: "Espectros",
    description:
      "As diabas do meio-dia são espectros de mulheres que morreram de exaustão nos campos durante o calor do verão. Aparecem ao meio-dia em dias quentes, rodeadas por redemoinhos de poeira e vento. Podem criar ilusões de si mesmas para confundir suas vítimas enquanto drenam sua energia vital.",
    weaknesses: {
      signs: ["Yrden", "Igni"],
      oils: ["Óleo de Espectro"],
      bombs: ["Lua Negra", "Bomba de Sal de Prata"],
    },
    difficulty: 3,
    locations: ["Velen", "Jardim Branco", "Campos de Oxenfurt"],
    tip: "Sem Yrden, não vale nem a pena tentar — o espectro vai atravessar tua espada como fumaça. Coloca a armadilha no chão e luta dentro do círculo. Quando ela se dividir em cópias, procura a verdadeira: é a que brilha diferente. Paciência, Geralt, paciência.",
  },
  {
    id: "leshen",
    name: "Leshen",
    category: "Relictos",
    description:
      "Os leshens são antigos guardiões das florestas, seres de poder imenso que controlam a fauna e a flora ao seu redor. Com aparência de árvores retorcidas com crânios de cervos, podem invocar raízes do solo, comandar lobos e corvos, e se teleportar entre as árvores. Comunidades inteiras vivem sob seu domínio sem saber.",
    weaknesses: {
      signs: ["Igni", "Quen"],
      oils: ["Óleo de Relictos"],
      bombs: ["Dimeritium", "Dança das Fadas"],
    },
    difficulty: 4,
    locations: ["Velen", "Floresta de Ard Skellig", "Bosques Antigos"],
    tip: "Um leshen antigo é uma das criaturas mais perigosas que vais enfrentar. Queima os totens que encontrares na floresta antes de lutar — isso o enfraquece. Igni é essencial: madeira queima, e isso inclui leshens. Quando ele invocar raízes, rola para longe imediatamente.",
  },
  {
    id: "demonio",
    name: "Demônio",
    category: "Relictos",
    description:
      "Os demônios são relictos massivos que lembram alces deformados de tamanho colossal. Possuem um terceiro olho na testa capaz de criar ilusões e desorientar suas presas. Seu tamanho e força são avassaladores, e poucos bruxos sobrevivem a um encontro sem preparação adequada.",
    weaknesses: {
      signs: ["Igni", "Aard"],
      oils: ["Óleo de Relictos"],
      bombs: ["Dimeritium", "Lua Negra"],
    },
    difficulty: 4,
    locations: ["Velen", "Skellige", "Crookback Bog"],
    tip: "O terceiro olho do demônio é o verdadeiro perigo — quando ele brilhar, desvia o olhar ou serás preso numa ilusão enquanto a besta te esmaga. Samambaia-do-diabo ajuda contra o efeito. É grande e lento nos ataques, então usa isso a teu favor. Golpeia nas patas e rola entre as pernas.",
  },
  {
    id: "katakan",
    name: "Katakan",
    category: "Vampiros",
    description:
      "Os katakans são vampiros superiores que se alimentam de sangue humano com voracidade insaciável. Diferentemente dos ekimmaras, os katakans são inteligentes e astutos, capazes de ficar invisíveis por breves períodos. Costumam habitar cavernas, ruínas e até porões de cidades, caçando nas sombras da noite.",
    weaknesses: {
      signs: ["Igni", "Yrden"],
      oils: ["Óleo de Vampiro"],
      bombs: ["Lua Negra", "Dança das Fadas"],
    },
    difficulty: 3,
    locations: ["Novigrad", "Oxenfurt", "Cavernas de Velen"],
    tip: "Um katakan invisível é um katakan que vai te matar. Usa Lua Negra para impedir que ele desapareça e Yrden para desacelerá-lo. São rápidos e saltam sem aviso — mantém distância e contra-ataca após os saltos. Bomba de vampiro nos olhos também funciona, se tiveres sorte na mira.",
  },
  {
    id: "endrega",
    name: "Endrega",
    category: "Insectóides",
    description:
      "As endregas são insectóides coloniais que constroem ninhos subterrâneos em florestas densas. Operárias e guerreiras protegem a rainha com ferocidade cega. Seus ferrões contêm veneno paralisante, e suas mandíbulas podem cortar armaduras como papel. Destruir o ninho é a única forma de eliminar a colônia por completo.",
    weaknesses: {
      signs: ["Igni", "Aard"],
      oils: ["Óleo de Insectóide"],
      bombs: ["Chuva de Estrelas"],
    },
    difficulty: 2,
    locations: ["Velen", "Floresta de Novigrad", "Ard Skellig"],
    tip: "Endregas vêm em grupos — nunca subestime o número. Igni é devastador contra elas: quitina queima muito bem. Se encontrares o ninho, destrói-o com Igni ou bombas antes de mais guerreiras aparecerem. Os ovos explodem com fogo, e a rainha fica furiosa, mas vulnerável.",
  },
  {
    id: "bruxa-dagua",
    name: "Bruxa d'Água",
    category: "Necrófalos",
    description:
      "As bruxas d'água são criaturas repugnantes que habitam pântanos, rios e lagos. Apesar de parecerem velhas decrépitas, são surpreendentemente rápidas e fortes. Cospem lama corrosiva que cega e queima, e arrastam suas vítimas para debaixo d'água onde as afogam lentamente.",
    weaknesses: {
      signs: ["Igni", "Quen"],
      oils: ["Óleo de Necrófalos"],
      bombs: ["Lua Negra"],
    },
    difficulty: 2,
    locations: ["Velen", "Crookback Bog", "Pântanos de Skellige"],
    tip: "Nunca lute contra uma bruxa d'água perto da margem — ela vai te puxar para a água, e aí acabou. Igni seca a lama que ela cospe e a faz recuar. Cuidado com o cuspe: se te acertar nos olhos, ficas cego por tempo suficiente para ela arrancar tua garganta.",
  },
  {
    id: "viverna",
    name: "Viverna",
    category: "Draconídeos",
    description:
      "As vivernas são draconídeos alados menores que dragões, mas igualmente letais. Habitam penhascos e ruínas elevadas, de onde mergulham sobre suas presas com velocidade impressionante. Sua cauda é venenosa e seus dentes são capazes de perfurar armaduras pesadas. São extremamente territoriais durante a época de nidificação.",
    weaknesses: {
      signs: ["Aard", "Igni"],
      oils: ["Óleo de Draconídeo"],
      bombs: ["Bomba de Fragmentação", "Chuva de Estrelas"],
    },
    difficulty: 3,
    locations: ["Skellige", "Velen", "Penhascos de Ard Skellig"],
    tip: "A viverna ataca do alto — fica atento ao céu. Quando ela mergulhar, rola para o lado e usa Aard para derrubá-la. No chão, ela é vulnerável por alguns segundos. Golpeia rápido nas asas: uma viverna que não voa é uma viverna que morre. Cuidado com a cauda venenosa.",
  },
  {
    id: "lobisomem",
    name: "Lobisomem",
    category: "Bestas Amaldiçoadas",
    description:
      "Os lobisomens são humanos amaldiçoados que se transformam em bestas ferozes sob a luz da lua cheia. Em sua forma bestial, possuem força sobre-humana, regeneração acelerada e instintos predatórios incontroláveis. Alguns mantêm fragmentos de consciência humana, o que os torna ainda mais perigosos e imprevisíveis.",
    weaknesses: {
      signs: ["Igni", "Yrden"],
      oils: ["Óleo de Bestas Amaldiçoadas"],
      bombs: ["Lua Negra", "Dança das Fadas"],
    },
    difficulty: 3,
    locations: ["Velen", "Skellige", "Florestas de Novigrad"],
    tip: "O maior problema do lobisomem é a regeneração — ele se cura enquanto lutas. Igni e Lua Negra bloqueiam essa cura, então usa-os sem hesitar. São rápidos e ferozes, mas previsíveis: atacam sempre com as garras em sequências de três. Conta os golpes e contra-ataca no quarto tempo.",
  },
  {
    id: "rabo-forquilha",
    name: "Rabo-Forquilha",
    category: "Draconídeos",
    description:
      "Os rabos-forquilha são draconídeos menores conhecidos por suas caudas bifurcadas extremamente venenosas. Mais ágeis que vivernas, caçam em pares e usam táticas coordenadas para cercar suas presas. Seu veneno causa paralisia muscular progressiva, deixando a vítima consciente enquanto é devorada.",
    weaknesses: {
      signs: ["Aard", "Igni"],
      oils: ["Óleo de Draconídeo"],
      bombs: ["Chuva de Estrelas"],
    },
    difficulty: 3,
    locations: ["Velen", "Skellige", "Colinas de Kaer Morhen"],
    tip: "Rabos-forquilha são mais espertos que vivernas — não cometas o erro de subestimá-los. A cauda bifurcada tem alcance maior do que parece. Aard quando estiverem no ar, Igni quando estiverem no chão. Se vires dois juntos, recua e lida com um de cada vez. Heroísmo contra draconídeos é suicídio.",
  },
  {
    id: "botchling",
    name: "Botchling",
    category: "Bestas Amaldiçoadas",
    description:
      "Os botchlings são uma das criaturas mais trágicas do Continente — fetos natimortos que não receberam nome nem enterro adequado, transformados em monstros por energia negativa. Alimentam-se do sangue de mulheres grávidas, crescendo a cada refeição. Podem ser transformados em lubberkins através de um ritual adequado.",
    weaknesses: {
      signs: ["Axii", "Quen"],
      oils: ["Óleo de Bestas Amaldiçoadas"],
      bombs: ["Dimeritium"],
    },
    difficulty: 2,
    locations: ["Velen", "Proximidades de Crow's Perch"],
    tip: "Esta é uma caçada que pesa na consciência, rapaz. O botchling era uma criança. Se possível, convence o pai a fazer o ritual do lubberkin — é o caminho certo. Se a luta for inevitável, Axii o acalma temporariamente e Quen te protege dos ataques frenéticos. Não o deixes crescer alimentando-se de sangue.",
  },
  {
    id: "golem",
    name: "Golem",
    category: "Elementais",
    description:
      "Os golems são constructos mágicos feitos de pedra, argila ou cristal, animados por feiticeiros poderosos para guardar locais importantes. Não sentem dor, não cansam e não param até que seu alvo seja destruído ou seu criador os desative. Sua força é descomunal e seus punhos podem esmagar rocha sólida.",
    weaknesses: {
      signs: ["Quen", "Yrden"],
      oils: ["Óleo de Elementais"],
      bombs: ["Dimeritium"],
    },
    difficulty: 4,
    locations: ["Ruínas Élficas", "Torres de Feiticeiros", "Kaer Morhen"],
    tip: "Não tentes trocar golpes com um golem — ele é mais forte que tu, ponto final. Quen é obrigatório para sobreviver aos socos que inevitavelmente vais levar. Yrden o desacelera, e bombas de dimeritium interrompem a magia que o anima. Ataca pelas costas, sempre pelas costas. Paciência vence a pedra.",
  },
  {
    id: "cocatriz",
    name: "Cocatriz",
    category: "Draconídeos",
    description:
      "As cocatrizes são draconídeos menores com bico cruel e asas coriáceas. Apesar do tamanho modesto, são extremamente agressivas e atacam qualquer coisa que entre em seu território. Seus ataques aéreos são rápidos e difíceis de prever, e seu bico pode perfurar armaduras leves com facilidade.",
    weaknesses: {
      signs: ["Aard", "Igni"],
      oils: ["Óleo de Draconídeo"],
      bombs: ["Chuva de Estrelas", "Bomba de Fragmentação"],
    },
    difficulty: 3,
    locations: ["Velen", "Jardim Branco", "Skellige"],
    tip: "A cocatriz é como um grifino menor — mesma tática, mas mais rápida. Aard para derrubá-la do ar, depois golpes rápidos. Não te deixes rodear: ela ataca em círculos quando está no chão. O bico é perigoso, mas as garras são piores. Óleo de draconídeo faz toda a diferença aqui.",
  },
  {
    id: "diaba-da-noite",
    name: "Diaba da Noite",
    category: "Espectros",
    description:
      "As diabas da noite são espectros de mulheres que morreram de coração partido ou foram assassinadas por amantes. Aparecem ao anoitecer em cemitérios e encruzilhadas, envolvidas em véus etéreos. São mais poderosas que suas contrapartes diurnas e podem drenar a vitalidade de suas vítimas à distância.",
    weaknesses: {
      signs: ["Yrden", "Quen"],
      oils: ["Óleo de Espectro"],
      bombs: ["Lua Negra", "Bomba de Sal de Prata"],
    },
    difficulty: 3,
    locations: ["Velen", "Novigrad", "Cemitérios de Skellige"],
    tip: "Mais perigosa que a diaba do meio-dia — esta ataca à distância e drena tua vida enquanto flutua fora do alcance. Yrden é absolutamente necessário para materializá-la. Quen te protege do dreno de vida. Quando ela se materializar no círculo de Yrden, não percas tempo: golpes rápidos e fortes. Ela vai tentar fugir — não deixes.",
  },
  {
    id: "troll-de-gelo",
    name: "Troll de Gelo",
    category: "Ogróides",
    description:
      "Os trolls de gelo são uma variante dos trolls comuns adaptada ao frio extremo das montanhas de Skellige. Cobertos por uma grossa camada de gelo, são mais resistentes e fortes que trolls de rocha. Apesar de serem criaturas brutais, alguns demonstram inteligência rudimentar e podem até ser persuadidos a conversar.",
    weaknesses: {
      signs: ["Igni", "Quen"],
      oils: ["Óleo de Ogróide"],
      bombs: ["Chuva de Estrelas"],
    },
    difficulty: 3,
    locations: ["Skellige", "Montanhas de Undvik", "Ard Skellig"],
    tip: "Igni, Igni e mais Igni — derrete o gelo que os protege e causa dano real. São lentos mas atingem como uma avalanche. Quando levantarem pedras para atirar, rola para o lado. Ah, e tenta falar com eles primeiro — nem todo troll precisa morrer. Alguns só querem que os deixem em paz.",
  },
  {
    id: "bruxa-vampiro",
    name: "Bruxa",
    category: "Vampiros",
    description:
      "As bruxas são vampiras superiores de aparência feminina, capazes de alternar entre uma forma humana sedutora e uma criatura bestial com garras e presas letais. São extremamente rápidas — talvez as mais velozes entre todos os vampiros. Quando enfurecidas, tornam-se invisíveis e atacam com velocidade sobre-humana.",
    weaknesses: {
      signs: ["Yrden", "Igni"],
      oils: ["Óleo de Vampiro"],
      bombs: ["Lua Negra", "Dança das Fadas"],
    },
    difficulty: 4,
    locations: ["Toussaint", "Cavernas de Skellige", "Novigrad"],
    tip: "A bruxa é uma das adversárias mais mortais que enfrentarás. Quando ela ficar invisível — e vai ficar —, Lua Negra e Yrden são tua salvação. Ela se move tão rápido que os olhos não acompanham. Fica dentro do círculo de Yrden e espera que ela venha até ti. Contra-ataques são mais eficazes que investidas. Uma bruxa acuada é uma bruxa morta.",
  },
  {
    id: "ciclope",
    name: "Ciclope",
    category: "Ogróides",
    description:
      "Os ciclopes são ogróides gigantescos com um único olho no centro da face. Habitam cavernas nas montanhas e ilhas remotas, alimentando-se de qualquer criatura viva que encontrem. Apesar de pouco inteligentes, sua força bruta é incomparável — um único soco pode matar um homem com armadura pesada.",
    weaknesses: {
      signs: ["Quen", "Aard"],
      oils: ["Óleo de Ogróide"],
      bombs: ["Chuva de Estrelas", "Bomba de Fragmentação"],
    },
    difficulty: 3,
    locations: ["Skellige", "Ilha de Undvik", "Cavernas Costeiras"],
    tip: "O olho é o ponto fraco óbvio — uma besta com mira certeira pode cegá-lo temporariamente. Quen é essencial porque basta um golpe para te mandar para o outro mundo. Aard pode desequilibrá-lo, abrindo uma janela para ataques. Foge das investidas, ataca pelos flancos. Nunca, jamais, fiques na frente dele.",
  },
  {
    id: "djinn",
    name: "Djinn",
    category: "Elementais",
    description:
      "Os djinns são elementais do ar de poder quase ilimitado, capazes de conceder desejos — sempre com consequências terríveis. São entidades do plano elemental que, quando invocados, ficam presos entre os mundos, o que os torna incrivelmente furiosos e destrutivos. Poucos feiticeiros conseguem controlá-los, e ainda menos sobrevivem à tentativa.",
    weaknesses: {
      signs: ["Aard", "Quen"],
      oils: ["Óleo de Elementais"],
      bombs: ["Dimeritium"],
    },
    difficulty: 5,
    locations: ["Varia — onde quer que sejam invocados"],
    tip: "Se encontrares um djinn, a melhor decisão é correr. Se não puderes correr... Dimeritium é obrigatório para suprimir a magia dele. Quen te mantém vivo contra os ataques elementais. Aard pode dispersar temporariamente sua forma. Mas ouve bem, Geralt: não faças desejos. Nunca. Não importa o quão tentador pareça. O preço é sempre maior do que imaginas.",
  },
  {
    id: "eredin",
    name: "Eredin",
    category: "Espectros",
    description:
      "Eredin Bréacc Glas, o Rei da Caçada Selvagem, é o comandante dos cavaleiros espectrais que atravessam as esferas em busca de poder. Antigo general dos Aen Elle, lidera seus Dearg Ruadhri numa cruzada entre mundos. Sua armadura negra e sua espada são lendárias, e seu domínio sobre o gelo e a magia entre esferas é absoluto.",
    weaknesses: {
      signs: ["Quen", "Igni"],
      oils: ["Óleo de Espectro"],
      bombs: ["Dimeritium", "Lua Negra"],
    },
    difficulty: 5,
    locations: ["Naglfar", "Undvik", "Tedd Deireadh"],
    tip: "Esta é a luta da tua vida, rapaz. Tudo o que aprendeste em Kaer Morhen, tudo pelo que treinámos — é para este momento. Quen é a diferença entre vida e morte contra os golpes dele. Ele abre portais e ataca pelas costas — mantém-te em movimento constante. Igni quando estiver vulnerável. Não tentes ser herói: luta como um bruxo. Metódico. Paciente. Implacável.",
  },
];
