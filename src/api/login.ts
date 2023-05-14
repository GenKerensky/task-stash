/* eslint-disable @typescript-eslint/no-unused-vars */

export const login = async (params: {
  email: string;
  clientPublicEphemeral: string;
}) =>
  ({
    status: 200,
  } as Response);
