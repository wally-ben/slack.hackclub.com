import geoip from 'geoip-lite'
import countries from 'i18n-iso-countries'

// Register the languages we need
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export default async function handler(req, res) {
  // Extract client IP from headers
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
  
  // Handle comma-separated IPs
  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim()
  }

  // Handle local development
  if (!ip || ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    if (process.env.NODE_ENV === 'development') {
      return res.status(200).json({
        country_name: 'United States',
        country_code: 'US',
        region: 'CA',
        city: 'Los Angeles'
      })
    }
    return res.status(400).json({ error: 'Could not determine client IP' })
  }

  try {
    const geo = geoip.lookup(ip)

    if (!geo) {
      return res.status(404).json({ error: 'Location not found for this IP' })
    }

    // Convert 2-letter country code to full name for frontend matching
    const countryName = countries.getName(geo.country, 'en')

    res.status(200).json({
      country_name: countryName || geo.country,
      country_code: geo.country,
      region: geo.region,
      city: geo.city
    })
  } catch (error) {
    console.error('Local geolocation error:', error)
    res.status(500).json({ error: 'Failed to perform local geolocation' })
  }
}
