const AuthEndpoints = {
  Signup: "/Auth/Signup",
  Signin: "/Auth/Signin",
};

const UserEndpoints = {
  GetUsers: "/User/GetUsers",
  GetUserById: "/User/GetUser/",
};

const MessageEndpoints = {
  Create: "/Message/Create",
  GetBySenderId: "/Message/GetBySenderId/",
  GetByReceiverId: "/Message/GetByReceiverId/",
  GetMessages: "/Message/GetMessages",
  UpdateReply: "/Message/UpdateReply",
  GetByUserId: "/Message/GetByUserId",
};

export { AuthEndpoints, UserEndpoints, MessageEndpoints };
