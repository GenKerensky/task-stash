import { Outlet } from "@solidjs/router";
import {
  Box,
  Button,
  Card,
  Container,
  Icon,
  IconButton,
  Typography,
} from "@suid/material";
import { createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

import CreateAccountForm from "./forms/CreateAccountForm";
import LoginForm from "./forms/LoginForm";

const LoginPage = () => {
  const [cardHeight, setCardHeight] = createSignal(1);

  const transitionDuration = 500;

  return (
    <Box
      as="div"
      sx={{
        minHeight: "100vh",
        background: [
          "rgb(100,222,240)",
          "radial-gradient(circle, rgba(100,222,240,1) 0%, rgba(51,34,75,1) 100%)",
        ],
      }}
    >
      {/* this is here because of this bug: https://github.com/swordev/suid/issues/187 */}
      <div style={{ display: "none" }}>
        <IconButton />
        <Button variant="contained" color="secondary" />
        <Typography variant="caption" fontStyle="italic" align="center" />
      </div>

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Card
          raised
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            transitionProperty: "min-height, max-height",
            transitionDuration: `${transitionDuration / 2}ms`,
            transitionTimingFunction: "ease-in-out",
            maxHeight: cardHeight(),
            minHeight: cardHeight(),
          }}
        >
          <Transition
            mode="outin"
            appear
            onEnter={(el, done) => {
              const height = Math.ceil(el.getClientRects()[0].height);
              setCardHeight(height);

              const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: transitionDuration,
              });
              a.finished.then(done);
            }}
            onExit={(el, done) => {
              const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: transitionDuration,
              });
              a.finished.then(done);
            }}
          >
            <Outlet />
          </Transition>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
export { LoginForm, CreateAccountForm };
