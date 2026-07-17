export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  const client_id = config.spotifyClientId
  const client_secret = config.spotifyClientSecret
  const refresh_token = config.spotifyRefreshToken

  // 1. Mock Data Implementation (we'll return this until env variables are set)
  if (!client_id || !client_secret || !refresh_token) {
    return {
      isPlaying: true,
      title: "Starboy",
      artist: "The Weeknd, Daft Punk",
      albumImageUrl: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
      songUrl: "https://open.spotify.com/track/7MXVkk9YMqq6aadBaOauSy",
      progressMs: 75000,
      durationMs: 230453
    }
  }

  // 2. Real API implementation
  const basic = btoa(`${client_id}:${client_secret}`)
  const tokenEndpoint = 'https://accounts.spotify.com/api/token'

  try {
    // Get access token
    const tokenResponse = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token
      })
    })

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    if (!accessToken) {
       return { isPlaying: false }
    }

    // Get currently playing track
    const nowPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
      return { isPlaying: false }
    }

    const song = await nowPlayingResponse.json()
    const isPlaying = song.is_playing

    if (!song.item) {
        return { isPlaying: false }
    }

    return {
      isPlaying,
      title: song.item.name,
      artist: song.item.artists.map((_artist: any) => _artist.name).join(', '),
      albumImageUrl: song.item.album.images[0].url,
      songUrl: song.item.external_urls.spotify,
      progressMs: song.progress_ms,
      durationMs: song.item.duration_ms
    }

  } catch (error) {
    console.error('Spotify API Error:', error)
    return { isPlaying: false }
  }
})
