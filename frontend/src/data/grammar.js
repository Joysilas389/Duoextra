class GrammarTopic {
  constructor(slug, title, level, cat, explanation, examples) {
    this.slug = slug; this.title = title; this.level = level;
    this.category = cat; this.explanation = explanation; this.examples = examples;
  }
}
const g = (s, t, l, c, e, ex) => new GrammarTopic(s, t, l, c, e, ex);

export const grammarTopics = [
  g('articles','Definite & Indefinite Articles','A1','articles','German has three genders. Every noun has a gender.\n\nDefinite articles (the):\n• Masculine: der Mann\n• Feminine: die Frau\n• Neuter: das Kind\n• Plural: die Kinder\n\nIndefinite articles (a/an):\n• Masculine: ein Mann\n• Feminine: eine Frau\n• Neuter: ein Kind\n\nGender tips:\n• -ung, -heit, -keit, -schaft → FEMININE\n• -chen, -lein → NEUTER\n• Days, months, seasons → MASCULINE',
    ['Der Tisch ist gross.','Die Lampe ist neu.','Das Buch ist interessant.']),
  g('nominative','Nominative Case','A1','cases','The nominative is for the SUBJECT.\n\nArticles stay the same as basic form:\n• der/ein (m), die/eine (f), das/ein (n), die/- (pl)\n\nQuestion: WER? (Who?) / WAS? (What?)',
    ['Der Mann liest.','Die Frau trinkt Kaffee.','Das Kind spielt.']),
  g('accusative','Accusative Case','A1','cases','The accusative is for the DIRECT OBJECT.\n\nOnly MASCULINE changes:\n• der → den, ein → einen\n• die/das stay the same\n\nAccusative prepositions: durch, fuer, gegen, ohne, um',
    ['Ich sehe den Mann.','Er kauft einen Apfel.','Wir gehen durch den Park.']),
  g('dative','Dative Case','A2','cases','The dative marks the INDIRECT OBJECT.\n\nAll genders change:\n• der → dem, ein → einem (m)\n• die → der, eine → einer (f)\n• das → dem, ein → einem (n)\n• die → den + n (pl)\n\nDative prepositions: aus, bei, mit, nach, seit, von, zu',
    ['Ich gebe dem Mann das Buch.','Sie hilft der Frau.','Er kommt aus dem Haus.']),
  g('present-tense','Present Tense','A1','verbs','Regular conjugation:\nich -e, du -st, er/sie/es -t\nwir -en, ihr -t, sie/Sie -en\n\nStem-changing verbs (du/er forms):\n• e→i: sprechen → du sprichst\n• a→ae: fahren → du faehrst\n• e→ie: lesen → du liest',
    ['Ich lerne Deutsch.','Du sprichst gut.','Er faehrt nach Berlin.']),
  g('perfekt','Perfekt (Present Perfect)','A2','verbs','haben/sein + Partizip II\n\nMost verbs use HABEN:\n• Ich habe gegessen.\n\nMovement verbs use SEIN:\n• Ich bin gefahren.\n• Sie ist gekommen.\n\nPartizip II:\n• Regular: ge-stem-t (gemacht)\n• Irregular: ge-stem-en (gegessen)\n• Inseparable: no ge- (besucht, verstanden)',
    ['Ich habe gestern gelernt.','Wir sind gefahren.','Hast du den Film gesehen?']),
  g('modal-verbs','Modal Verbs','A2','verbs','6 modal verbs:\n• koennen (can)\n• muessen (must)\n• duerfen (may)\n• sollen (should)\n• wollen (want)\n• moegen (like)\n\nModal in position 2, infinitive at END:\nIch kann Deutsch sprechen.',
    ['Ich kann schwimmen.','Du musst zum Arzt gehen.','Darf ich hier sitzen?']),
  g('separable-verbs','Separable Verbs','A2','verbs','Separable prefixes go to the END in main clauses.\n\nCommon prefixes: an-, auf-, aus-, ein-, mit-, vor-, zu-\n\n• anfangen → Ich fange an.\n• aufstehen → Er steht auf.\n• einkaufen → Wir kaufen ein.\n\nIn Perfekt: ge- between prefix and verb:\n• angefangen, aufgestanden',
    ['Ich stehe um 6 Uhr auf.','Wann faengt der Kurs an?','Ruf mich an!']),
  g('two-way-prepositions','Two-Way Prepositions','B1','prepositions','an, auf, hinter, in, neben, ueber, unter, vor, zwischen\n\nMovement (wohin?) → ACCUSATIVE:\nIch gehe in den Park.\n\nLocation (wo?) → DATIVE:\nIch bin im Park.\n\nRemember: Wo = Dativ, Wohin = Akkusativ',
    ['Ich gehe in den Park. (Akk)','Ich bin im Park. (Dat)','Stell es auf den Tisch. (Akk)']),
  g('konjunktiv-ii','Konjunktiv II','B2','verbs','For wishes, hypotheticals, polite requests.\n\nForms:\n• waere (would be)\n• haette (would have)\n• wuerde + infinitive (would do)\n• koennte (could)\n\nWenn ich reich waere, wuerde ich reisen.\nKoennten Sie mir helfen?',
    ['Wenn ich Zeit haette...','Ich wuerde gern kommen.','Koennten Sie mir helfen?']),
];

export const grammarCategories = { articles: 'Articles & Gender', cases: 'Cases', verbs: 'Verbs & Tenses', prepositions: 'Prepositions' };
