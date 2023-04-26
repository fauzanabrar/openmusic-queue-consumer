const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT s.id, s.title, s.performer
      FROM playlist_songs AS ps
      INNER JOIN songs AS s ON s.id = ps.song_id
      WHERE ps.playlist_id = $1`,
      values: [playlistId],
    };

    const results = await this._pool.query(query);

    return results.rows;
  }
}

module.exports = PlaylistSongsService;
