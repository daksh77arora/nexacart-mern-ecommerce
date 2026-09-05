const { createClerkClient, verifyToken } = require('@clerk/backend');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const token = authorization.split(' ')[1];
    const session = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    const clerkUser = await clerkClient.users.getUser(session.sub);
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || email;

    let user = await User.findOne({ clerkId: session.sub });
    if (!user && email) user = await User.findOne({ email });

    if (user) {
      user.clerkId = session.sub;
      user.name = name;
      user.email = email;
      await user.save();
    } else {
      user = await User.create({ clerkId: session.sub, name, email });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Clerk authentication failed:', error.message);
    res.status(401).json({ message: 'Not authorized, Clerk session failed' });
  }
};

module.exports = { protect };
