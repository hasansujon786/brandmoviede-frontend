const constants = {
  baseApiURL: process.env.NEXT_PUBLIC_API_URL || "http://192.168.7.42:4008/api",
  socketURL: process.env.NEXT_PUBLIC_SOCKET_URL || "http://192.168.7.42:4008",
};

export const config = {
  imageUnoptimized: true,
};
export default constants;
