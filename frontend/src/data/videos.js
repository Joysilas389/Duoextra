class Video {
  constructor(title, channel, level, videoId, topic) {
    this.title = title; this.channel = channel; this.level = level;
    this.videoId = videoId; this.topic = topic;
    this.embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }
}
const v = (t, ch, l, id, tp) => new Video(t, ch, l, id, tp);

export const videoResources = [
  v('Super Easy German 1','Easy German','A1','dGCSYVhODgA','Basics'),
  v('Ordering Food in German','Easy German','A1','BN9rRLXujUw','Restaurant'),
  v('At the Supermarket','Easy German','A1','k7FGBqC9ZWQ','Shopping'),
  v('German for Beginners A1','Deutsch lernen mit der DW','A1','rE8PVgrVEaI','General'),
  v('At the Train Station','Easy German','A1','mFcMbOjHSaQ','Travel'),
  v('Daily Routine in German','Dein Sprachcoach','A1','WpFJTnMxaY0','Daily Life'),
  v('At the Doctor A2','Easy German','A2','5b-akNoJ6Jk','Health'),
  v('Apartment Hunting','Easy German','A2','NTUhdVuFk_E','Housing'),
  v('Opening a Bank Account','Deutsch lernen mit der DW','A2','3v09PEQAL8o','Banking'),
  v('Making a Phone Call','Dein Sprachcoach','A2','v4DJqy1m5k8','Communication'),
  v('At the Pharmacy','Easy German','A2','rVLsPGKKVWY','Health'),
  v('Shopping for Clothes','Easy German','A2','IJaL-Mlb7i8','Shopping'),
  v('German B1 Conversation','Deutsch lernen mit der DW','B1','jLHNs3N0FiQ','Housing'),
  v('Job Interview in German','Dein Sprachcoach','B1','L3m76JdiZoU','Work'),
  v('At the Immigration Office','Learn German with Anja','B1','G__lu-BQ74s','Bureaucracy'),
  v('Discussing Opinions B1','Easy German','B1','z2CqsRCUIqg','Opinions'),
  v('German B2 Conversation','Easy German','B2','IKQqoVYbqV4','Advanced'),
  v('Debating in German','Deutsch fuer Euch','B2','HPhZz5JCHDk','Discussion'),
];
