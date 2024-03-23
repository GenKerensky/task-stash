import { Outlet } from '@solidjs/router';
import { Check, Lock } from '@suid/icons-material';
import {
  Box,
  Card,
  Container,
  Grid,
  SvgIcon,
  Typography,
} from '@suid/material';
import { type Component } from 'solid-js';

// import { Transition } from 'solid-transition-group';
import CreateAccountForm from './forms/CreateAccountForm';
import LoginForm from './forms/LoginForm';
const LoginPage: Component = () => (
  // const [ cardHeight, setCardHeight ] = createSignal(1);

  // const transitionDuration = 250;

  <Container
    maxWidth="sm"
    sx={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      padding={2}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          color: '#FFFFFFEE',
          padding: 1,
        }}
      >
        <SvgIcon fontSize="medium">
          <Check />
        </SvgIcon>
        <SvgIcon fontSize="medium">
          <Lock />
        </SvgIcon>
      </Box>
      <Typography
        variant="h1"
        color="#FFFFFFEE"
        textAlign="center"
        fontSize={60}
      >
        Task Stash
      </Typography>
    </Box>
    <Card
      raised
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // height: 'auto',
        // transitionProperty: 'min-height, max-height',
        // transitionDuration: `${transitionDuration / 2}ms`,
        // transitionTimingFunction: 'ease-in-out',
        // maxHeight: cardHeight(),
        // minHeight: cardHeight(),
      }}
    >
      {/* <Transition
            mode="outin"
            appear
            onEnter={(el, done) => {
              el.setAttribute('style', 'height: 100%; width: 100%; display:flex; flex-direction: column; align-items: center; justify-content: center;');
              const height = Math.ceil(el.getClientRects()[0].height);
              setCardHeight(height);

              const a = el.animate([ { opacity: 0 }, { opacity: 1 } ], {
                duration: transitionDuration,
              });
              a.finished.then(done);
            }}
            onExit={(el, done) => {
              const a = el.animate([ { opacity: 1 }, { opacity: 0 } ], {
                duration: transitionDuration,
              });
              a.finished.then(done);
            }}
          > */}
      <Outlet />
      {/* </Transition> */}
    </Card>
  </Container>
);
export default LoginPage;
export { CreateAccountForm, LoginForm };
