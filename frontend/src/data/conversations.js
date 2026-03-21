class Conversation {
  constructor({ id, title, scenario, level, desc, videoId, videoChannel, turns, phrases }) {
    this.id = id; this.title = title; this.scenario = scenario;
    this.level = level; this.description = desc;
    this.videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    this.videoChannel = videoChannel;
    this.turns = turns; this.keyPhrases = phrases;
  }
}

class Turn { constructor(speaker, text) { this.speaker = speaker; this.text = text; } }
class KeyPhrase { constructor(de, en) { this.de = de; this.en = en; } }

const c = (opts) => new Conversation(opts);
const t = (s, txt) => new Turn(s, txt);
const kp = (de, en) => new KeyPhrase(de, en);

export const conversations = [
  c({ id:'arzt-termin', title:'Beim Arzt — Termin machen', scenario:'doctor_visit', level:'A2',
    desc:'Making a doctor appointment by phone', videoId:null, videoChannel:'Easy German',
    turns: [t('Sprechstundenhilfe','Praxis Dr. Mueller, guten Tag.'), t('Patient','Guten Tag, ich moechte einen Termin machen.'), t('Sprechstundenhilfe','Was haben Sie fuer Beschwerden?'), t('Patient','Ich habe seit drei Tagen Halsschmerzen und Fieber.'), t('Sprechstundenhilfe','Koennen Sie morgen um 10 Uhr kommen?'), t('Patient','Ja, das passt. Vielen Dank!')],
    phrases: [kp('Ich moechte einen Termin machen','I would like to make an appointment'), kp('Was haben Sie fuer Beschwerden?','What complaints do you have?'), kp('Bringen Sie Ihre Versicherungskarte mit','Bring your insurance card')] }),
  c({ id:'bahnhof', title:'Am Bahnhof — Fahrkarte kaufen', scenario:'train_station', level:'A1',
    desc:'Buying a train ticket at the counter', videoId:null, videoChannel:'Easy German',
    turns: [t('Reisender','Guten Tag, eine Fahrkarte nach Berlin bitte.'), t('Mitarbeiter','Einfach oder hin und zurueck?'), t('Reisender','Hin und zurueck bitte.'), t('Mitarbeiter','Das macht 79 Euro. Zweite Klasse?'), t('Reisender','Ja. Von welchem Gleis?'), t('Mitarbeiter','Gleis 7. Gute Reise!')],
    phrases: [kp('Eine Fahrkarte nach... bitte','A ticket to... please'), kp('Einfach oder hin und zurueck?','One way or round trip?'), kp('Von welchem Gleis?','From which platform?')] }),
  c({ id:'wohnung', title:'Wohnungssuche — Besichtigung', scenario:'apartment_search', level:'B1',
    desc:'Calling about an apartment listing', videoId:null, videoChannel:'Learn German with Anja',
    turns: [t('Mieter','Guten Tag, ich rufe wegen der Wohnung an. Ist die noch frei?'), t('Vermieter','Ja, zwei Zimmer, Kueche, Bad. 650 Euro kalt.'), t('Mieter','Wie hoch sind die Nebenkosten?'), t('Vermieter','Ungefaehr 200 Euro.'), t('Mieter','Kann ich die Wohnung besichtigen?'), t('Vermieter','Natuerlich. Passt Ihnen Samstag um 14 Uhr?')],
    phrases: [kp('Ist die noch frei?','Is it still available?'), kp('Wie hoch ist die Miete?','How much is the rent?'), kp('Kaltmiete / Nebenkosten','Base rent / utilities')] }),
  c({ id:'restaurant', title:'Im Restaurant bestellen', scenario:'restaurant', level:'A1',
    desc:'Ordering food and drinks at a restaurant', videoId:null, videoChannel:'Deutsch lernen mit der DW',
    turns: [t('Kellner','Guten Abend! Moechten Sie etwas trinken?'), t('Gast','Ein Wasser und ein Bier bitte.'), t('Kellner','Haben Sie schon gewaehlt?'), t('Gast','Ja, die Currywurst mit Pommes bitte.'), t('Kellner','Sehr gern. Kommt sofort.'), t('Gast','Koennte ich die Rechnung haben?'), t('Kellner','Natuerlich. Das macht 18 Euro 50.')],
    phrases: [kp('Ich haette gern...','I would like...'), kp('Haben Sie schon gewaehlt?','Have you chosen?'), kp('Die Rechnung bitte','The bill please')] }),
  c({ id:'supermarkt', title:'Im Supermarkt einkaufen', scenario:'supermarket', level:'A1',
    desc:'Shopping at the supermarket', videoId:null, videoChannel:'Easy German',
    turns: [t('Kunde','Entschuldigung, wo finde ich die Milch?'), t('Mitarbeiter','Gang 3, links neben dem Kaese.'), t('Kunde','Danke! Haben Sie auch frisches Brot?'), t('Mitarbeiter','Ja, die Baeckerei ist am Eingang.'), t('Kassiererin','Das macht 12 Euro 30. Bar oder mit Karte?'), t('Kunde','Mit Karte bitte.')],
    phrases: [kp('Wo finde ich...?','Where can I find...?'), kp('Bar oder mit Karte?','Cash or card?'), kp('Das macht zusammen...','That comes to...')] }),
  c({ id:'vorstellung', title:'Vorstellungsgespraech', scenario:'job_interview', level:'B2',
    desc:'Job interview — introducing yourself', videoId:null, videoChannel:'Dein Sprachcoach',
    turns: [t('Personalleiter','Erzaehlen Sie uns etwas ueber sich.'), t('Bewerber','Ich heisse Ana Silva und habe BWL studiert.'), t('Personalleiter','Warum moechten Sie bei uns arbeiten?'), t('Bewerber','Ihre Firma ist bekannt fuer innovative Projekte.'), t('Personalleiter','Was sind Ihre Staerken?'), t('Bewerber','Ich bin teamfaehig und spreche vier Sprachen.')],
    phrases: [kp('Erzaehlen Sie ueber sich','Tell us about yourself'), kp('Warum moechten Sie bei uns arbeiten?','Why do you want to work here?'), kp('Was sind Ihre Staerken?','What are your strengths?')] }),
  c({ id:'auslaenderamt', title:'Beim Auslaenderamt', scenario:'immigration_office', level:'B1',
    desc:'Extending a residence permit', videoId:null, videoChannel:'Learn German with Anja',
    turns: [t('Beamter','Was kann ich fuer Sie tun?'), t('Antragsteller','Ich moechte meinen Aufenthaltstitel verlaengern.'), t('Beamter','Haben Sie alle Unterlagen? Pass, Meldebescheinigung, Arbeitsvertrag?'), t('Antragsteller','Ja, hier bitte.'), t('Beamter','Bearbeitungszeit ist vier Wochen. Gebuehr: 93 Euro.')],
    phrases: [kp('Aufenthaltstitel verlaengern','Extend residence permit'), kp('Meldebescheinigung','Registration certificate'), kp('Bearbeitungszeit','Processing time')] }),
  c({ id:'bank', title:'Bei der Bank — Konto eroeffnen', scenario:'bank', level:'A2',
    desc:'Opening a bank account', videoId:null, videoChannel:'Deutsch lernen mit der DW',
    turns: [t('Kunde','Ich moechte ein Girokonto eroeffnen.'), t('Berater','Haben Sie Ihren Ausweis und eine Meldebescheinigung?'), t('Kunde','Ja, hier bitte.'), t('Berater','Moechten Sie auch Online-Banking?'), t('Kunde','Ja gerne. Was kostet das Konto?'), t('Berater','Das Basiskonto ist kostenlos.')],
    phrases: [kp('Ein Girokonto eroeffnen','Open a current account'), kp('Online-Banking einrichten','Set up online banking'), kp('Was kostet das monatlich?','What does it cost monthly?')] }),
  c({ id:'arzt-praxis', title:'In der Arztpraxis', scenario:'doctor_visit', level:'A2',
    desc:'At the doctor — describing symptoms', videoId:null, videoChannel:'Easy German',
    turns: [t('Arzt','Was fehlt Ihnen?'), t('Patient','Ich habe starke Kopfschmerzen und mir ist schwindelig.'), t('Arzt','Seit wann haben Sie diese Beschwerden?'), t('Patient','Seit etwa drei Tagen.'), t('Arzt','Ich verschreibe Ihnen ein Medikament.'), t('Patient','Muss ich nochmal kommen?'), t('Arzt','Ja, kommen Sie in einer Woche wieder.')],
    phrases: [kp('Was fehlt Ihnen?','What is wrong?'), kp('Seit wann?','Since when?'), kp('Ich verschreibe Ihnen...','I will prescribe you...')] }),
  c({ id:'post', title:'Auf der Post — Paket schicken', scenario:'post_office', level:'A2',
    desc:'Sending a package at the post office', videoId:null, videoChannel:'Deutsch lernen mit der DW',
    turns: [t('Kunde','Ich moechte dieses Paket nach Spanien schicken.'), t('Mitarbeiter','Wie schwer ist es?'), t('Kunde','Ungefaehr 3 Kilo.'), t('Mitarbeiter','Normal oder Express?'), t('Kunde','Normal bitte. Was kostet das?'), t('Mitarbeiter','13 Euro 50. Moechten Sie eine Sendungsverfolgung?'), t('Kunde','Ja bitte.')],
    phrases: [kp('Ich moechte ein Paket schicken','I would like to send a package'), kp('Was kostet der Versand?','How much is shipping?'), kp('Sendungsverfolgung','Tracking')] }),
  c({ id:'telefon', title:'Am Telefon — Termin vereinbaren', scenario:'phone_call', level:'A2',
    desc:'Making an appointment by phone', videoId:null, videoChannel:'Dein Sprachcoach',
    turns: [t('Sekretaerin','Firma Schmidt, guten Tag.'), t('Anrufer','Guten Tag, ich moechte einen Termin mit Herrn Schmidt.'), t('Sekretaerin','Worum geht es?'), t('Anrufer','Es geht um meine Bewerbung.'), t('Sekretaerin','Passt Ihnen Donnerstag um 14 Uhr?'), t('Anrufer','Ja, das passt. Vielen Dank.')],
    phrases: [kp('Worum geht es?','What is it about?'), kp('Passt Ihnen...?','Does... suit you?'), kp('Das passt mir gut.','That suits me well.')] }),
  c({ id:'apotheke', title:'In der Apotheke', scenario:'pharmacy', level:'A2',
    desc:'Buying medicine at the pharmacy', videoId:null, videoChannel:'Easy German',
    turns: [t('Kunde','Guten Tag, ich habe starken Husten.'), t('Apotheker','Seit wann haben Sie den Husten?'), t('Kunde','Seit einer Woche.'), t('Apotheker','Ich empfehle Ihnen diesen Hustensaft.'), t('Kunde','Wie oft muss ich den nehmen?'), t('Apotheker','Dreimal taeglich, einen Loeffel.')],
    phrases: [kp('Ich habe starken Husten','I have a bad cough'), kp('Was empfehlen Sie?','What do you recommend?'), kp('Wie oft muss ich das nehmen?','How often do I take it?')] }),
];

export const scenarioIcons = {
  doctor_visit: 'Stethoscope', apartment_search: 'Home', train_station: 'Train',
  restaurant: 'UtensilsCrossed', supermarket: 'ShoppingCart', job_interview: 'Briefcase',
  immigration_office: 'Building2', bank: 'Landmark', post_office: 'Mail', phone_call: 'Phone', pharmacy: 'Pill',
};
