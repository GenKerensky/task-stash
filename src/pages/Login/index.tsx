import { Outlet } from '@solidjs/router';
import {
  Box,
  Card,
  Container,
} from '@suid/material';
import { type Component } from 'solid-js';

// import { Transition } from 'solid-transition-group';
import CreateAccountForm from './forms/CreateAccountForm';
import LoginForm from './forms/LoginForm';

const LoginPage: Component = () => {
  // const [ cardHeight, setCardHeight ] = createSignal(1);

  // const transitionDuration = 250;

  return (
    <Box
      as="div"
      sx={{
        minHeight: '100vh',
        background: [
          'rgb(100,222,240)',
          'radial-gradient(circle, rgba(100,222,240,1) 0%, rgba(51,34,75,1) 100%)',
        ],
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
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
    </Box>
  );
};

export default LoginPage;
export { CreateAccountForm,LoginForm };
