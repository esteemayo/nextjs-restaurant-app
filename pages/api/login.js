import cookie from 'cookie';

const handler = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'test1234') {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize(
          'token',
          'wedfghbkjjkvkklkjjnhjkjf856t34ghe387gvgvhwtf2uygvwdnbvxy234t%*yi$@!yz$$%',
          {
            maxAge: 60 * 60 * 1000,
            sameSite: 'strict',
            path: '/',
          }
        )
      );

      res.status(200).json('Successful');
    } else {
      res.status(400).json('Wrong credentials!');
    }
  }
};

export default handler;
