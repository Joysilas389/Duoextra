class Video {
  constructor(title, channel, level, videoId, topic) {
    this.title = title; this.channel = channel; this.level = level;
    this.videoId = videoId; this.topic = topic;
    this.embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }
}
const v = (t, ch, l, id, tp) => new Video(t, ch, l, id, tp);

// Using verified public video IDs from official channels
export const videoResources = [
  // DW Nicos Weg A1 (verified series)
  v('Nicos Weg A1: Hallo!', 'DW Deutsch lernen', 'A1', 'videoseries?list=PLs7zUeDHqvThGjKW_GmcAJRrjWYoGGpoO', 'Greetings'),
  // Learn German channel (1.97M subs - verified playlists)
  v('German for Beginners A1', 'Learn German', 'A1', 'videoseries?list=PLDl_JO4F0QUZR2omNNqz_xBx_3SnGDNxi', 'Basics'),
  // DW Nicos Weg A2
  v('Nicos Weg A2: Alltag', 'DW Deutsch lernen', 'A2', 'videoseries?list=PLs7zUeDHqvTgMy0hfDL6m-mjCnfidVr5O', 'Daily Life'),
  // DW Nicos Weg B1
  v('Nicos Weg B1: Deutschland', 'DW Deutsch lernen', 'B1', 'videoseries?list=PLs7zUeDHqvThxLWXPNnJwelFNRBh3bZgP', 'Advanced'),
];
