import { Box, Card, Grid, Heading, Text } from 'theme-ui'
import usePrefersMotion from '../../lib/use-prefers-motion'
import useHasMounted from '../../lib/use-has-mounted'

const Content = ({ onJoinClick }) => (
  <Grid
    gap={3}
    pt={[5, '100px']}
    pb={[3, 4]}
    sx={{
      backgroundImage:
        'radial-gradient( ellipse farthest-corner at top left, #ff8c37, #ec3750)'
    }}
  >
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        textShadow: 'text',
        textAlign: ['center', 'center']
      }}
    >
      <Heading
        as="h1"
        variant="title"
        sx={{
          color: 'white',
          fontSize: [5, 6, 7],
          lineHeight: 'limit',
          mb: [2, 3]
        }}
      >
        Hack Club Slack
      </Heading>
    </Box>
    <Box sx={{ zIndex: 5, display: 'flex', alignItems: 'center' }}>
      <Card
        sx={{
          variant: 'cards.translucent',
          maxWidth: (t) => `calc(${t.sizes.narrow} * 1.2)`,
          mx: 'auto',
          textAlign: 'center'
        }}
      >
        <Text as="p" sx={{ fontSize: [2, 3], mb: 3 }}>
          Hack Clubbers hang out on our Slack.
          <br />
          Join up to make friends, find projects, and have fun.
        </Text>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Text
            as="button"
            onClick={onJoinClick}
            sx={{
              bg: 'red',
              backgroundImage:
                'radial-gradient(ellipse farthest-corner at top left, #ff8c37, #ec3750)',
              color: 'white',
              fontSize: [2, 3],
              px: 5,
              py: 3,
              borderRadius: 'extra',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.125s ease-in-out',
              border: '2px solid white',
              cursor: 'pointer',
              fontFamily: 'inherit',
              ':hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 0 0 2px white',
                backgroundImage:
                  'radial-gradient(ellipse farthest-corner at bottom right, #ff8c373f, #ec37503f)'
              }
            }}
          >
            Join Hack Club
          </Text>
        </Box>
      </Card>
    </Box>
  </Grid>
)

const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: '-20%',
      height: '100%',
      aspectRatio: '1/1',
      right: 0,
      backgroundImage: 'url(slack-logo.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      opacity: 0.75,
      zIndex: 0,
      filter: 'saturate(0.9) grayscale(0.2)'
    }}
  />
)

const Static = ({
  img = 'https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png',
  onJoinClick
}) => (
  <Box
    as="section"
    id="slack"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover'
    }}
  >
    <Cover />
    <Content onJoinClick={onJoinClick} />
  </Box>
)

const Slack = ({ onJoinClick }) => {
  const hasMounted = useHasMounted()
  const prefersMotion = usePrefersMotion()
  if (hasMounted && prefersMotion) {
    return (
      <Box
        as="section"
        id="slack"
        sx={{ overflow: 'hidden', position: 'relative' }}
      >
        <Cover />
        <Content onJoinClick={onJoinClick} />
      </Box>
    )
  } else {
    return <Static onJoinClick={onJoinClick} />
  }
}

export default Slack
